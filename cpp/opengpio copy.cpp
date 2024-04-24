#include <napi.h>
#include <iostream>
#include "./libgpiod/bindings/cxx/gpiod.hpp"
#include <unistd.h>
#include <uv.h>
using namespace std;

Napi::Array GpioInput(Napi::CallbackInfo const &info)
{
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    string resourceName = "opengpio_" + to_string(chipNumber) + "_" + to_string(lineNumber) + "_input";

    try
    {
        line.request({resourceName, gpiod::line_request::DIRECTION_INPUT, 0});
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    Napi::Function getter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
                                                {
        bool value = line.get_value();
        return Napi::Boolean::New(info.Env(), value); });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
                                                 { line.release(); });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

    return arr;
}

Napi::Array GpioOutput(Napi::CallbackInfo const &info)
{
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    string resourceName = "opengpio_" + to_string(chipNumber) + "_" + to_string(lineNumber) + "_output";

    try
    {
        line.request({resourceName, gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    Napi::Function setter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
                                                {
        bool value = info[0].As<Napi::Boolean>().ToBoolean();
        line.set_value(value); });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
                                                 { line.release(); });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, setter);
    arr.Set(1u, cleanup);

    return arr;
}

struct WatchContext
{
    bool active;
    gpiod::line line;
    Napi::ThreadSafeFunction threadSafeWatchCallback;
};

Napi::Array GpioWatch(Napi::CallbackInfo const &info)
{
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();
    Napi::Function watchCallback = info[2].As<Napi::Function>();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    string resourceName = "opengpio_" + to_string(chipNumber) + "_" + to_string(lineNumber) + "_watch";

    Napi::ThreadSafeFunction threadSafeWatchCallback = Napi::ThreadSafeFunction::New(
        info.Env(), watchCallback, resourceName + "_callback", 0, 1, [](Napi::Env) {});

    try
    {
        line.request({resourceName, gpiod::line_request::EVENT_BOTH_EDGES, 0}, 0);
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    gpiod

        Napi::Function getter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
                                                    {
        bool value = line.get_value();
        return Napi::Boolean::New(info.Env(), value); });

    WatchContext *data = new WatchContext();
    data->line = line;
    data->active = true;
    data->threadSafeWatchCallback = threadSafeWatchCallback;

    uv_work_t *req = new uv_work_t;
    req->data = data;

    uv_queue_work(
        uv_default_loop(), req,
        [](uv_work_t *req)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data); // Get the data
            gpiod::line line = data->line;

            while (data->active)
            {
                bool hasEvent = line.event_wait(chrono::milliseconds(1));
                if (hasEvent)
                {
                    gpiod::line_event event = line.event_read();
                    bool value = event.event_type == gpiod::line_event::RISING_EDGE ? true : false;
                    data->threadSafeWatchCallback.BlockingCall(new bool(value), [](Napi::Env env, Napi::Function watchCallback, bool *value)
                                                               {
                                                                watchCallback.Call({Napi::Boolean::New(env, *value)});
                                                                delete value; });
                }
            }
        },
        [](uv_work_t *req, int status)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data);
            data->threadSafeWatchCallback.Release();
            data->line.release();

            delete req;
            delete data;
        });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                 { data->active = false; });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

    return arr;
}

struct PwmContext
{
    int frequency;
    double dutyCycle;
    bool active;
    gpiod::line line;
};

void WaitBlocking(long nanoseconds)
{
    // In a while loop continue to loop until the time has passed
    auto start = chrono::high_resolution_clock::now();
    while (true)
    {
        auto now = chrono::high_resolution_clock::now();
        long diff = chrono::duration_cast<std::chrono::nanoseconds>(now - start).count();
        if (diff >= nanoseconds)
        {
            break;
        }
    }
}

Napi::Array GpioPwm(Napi::CallbackInfo const &info)
{
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();
    double dutyCycle = info[2].As<Napi::Number>().DoubleValue();
    int frequency = info[3].As<Napi::Number>().Int32Value();

    printf("Pwm GPIO at: %d:%d -> %f:%d\n", chipNumber, lineNumber, dutyCycle, frequency);

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    string resourceName = "opengpio_" + to_string(chipNumber) + "_" + to_string(lineNumber) + "_pwm";

    try
    {
        line.request({resourceName, gpiod::line_request::EVENT_BOTH_EDGES, 0}, 0);
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    PwmContext *data = new PwmContext();
    data->frequency = frequency;
    data->dutyCycle = dutyCycle;
    data->line = line;
    data->active = true;

    uv_work_t *req = new uv_work_t;
    req->data = data;

    uv_queue_work(
        uv_default_loop(), req,
        [](uv_work_t *req)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data); // Get the data
            gpiod::line line = data->line;

            // int samples = 100;
            // int totalOffset = 0;
            // for (int i = 0; i < samples; i++)
            // {
            //     auto time1 = chrono::high_resolution_clock::now();
            //     line.set_value(true);
            //     auto now1 = chrono::high_resolution_clock::now();
            //     int diff1 = chrono::duration_cast<std::chrono::microseconds>(now1 - time1).count();
            //     usleep(100);
            //     auto time2 = chrono::high_resolution_clock::now();
            //     line.set_value(false);
            //     auto now2 = chrono::high_resolution_clock::now();
            //     int diff2 = chrono::duration_cast<std::chrono::microseconds>(now2 - time2).count();

            //     printf("Diff: %d : %d\n", diff1, diff2);
            // }

            // int offset = totalOffset / samples;
            // printf("Offset: %d\n", offset);

            // auto time = chrono::high_resolution_clock::now();
            // line.set_value(true);
            // auto now = chrono::high_resolution_clock::now();
            // int offset = chrono::duration_cast<std::chrono::microseconds>(now - time).count();
            // long tick_duration = std::chrono::steady_clock::duration(1);
            // printf("Tick Duration: %ld\n", tick_duration);

            while (data->active)
            {
                int frequency = data->frequency;
                double dutyCycle = data->dutyCycle;
                double period = 1.0 / frequency;
                double onTime = period * dutyCycle;
                double offTime = period - onTime;
                long onTimeNs = onTime * 1e9;
                long offTimeNs = offTime * 1e9;

                // auto onStart = chrono::high_resolution_clock::now();
                line.set_value(true);
                // auto onNow = chrono::high_resolution_clock::now();
                // long onOffset = chrono::duration_cast<std::chrono::microseconds>(onNow - onStart).count();
                WaitBlocking(onTimeNs);

                // auto now = chrono::high_resolution_clock::now();
                // int offset = chrono::duration_cast<std::chrono::microseconds>(now - time).count();

                // struct timespec onDelay;
                // onDelay.tv_sec = 0;
                // onDelay.tv_nsec = onTimeNs - offset;
                // nanosleep(&onDelay, NULL);

                // auto offStart = chrono::high_resolution_clock::now();
                line.set_value(false);
                // auto offNow = chrono::high_resolution_clock::now();
                // long offOffset = chrono::duration_cast<std::chrono::microseconds>(offNow - offStart).count();
                WaitBlocking(offTimeNs);
                // struct timespec offDelay;
                // offDelay.tv_sec = 0;
                // offDelay.tv_nsec = offTimeNs;
                // usleep(offTimeNs);
                // nanosleep(&offDelay, NULL);

                // time = chrono::high_resolution_clock::now();
                // line.set_value(true);
                // Wait(onTimeNs);

                // if (onTimeNs > 0)
                // {
                //     line.set_value(true);
                //     long offset = chrono::duration_cast<std::chrono::nanoseconds>(now - time).count();

                //     struct timespec onDelay;
                //     onDelay.tv_sec = 0;
                //     onDelay.tv_nsec = onTimeNs - offset;

                //     // printf("On Offset: %ld\n", offset);

                //     nanosleep(&onDelay, NULL);
                //     time = chrono::high_resolution_clock::now();
                // }

                // if (offTimeNs > 0)
                // {
                //     line.set_value(false);
                //     auto now = chrono::high_resolution_clock::now();
                //     long offset = chrono::duration_cast<std::chrono::nanoseconds>(now - time).count();
                //     // printf("Off Offset: %ld\n", offset);

                //     struct timespec offDelay;
                //     offDelay.tv_sec = 0;
                //     offDelay.tv_nsec = offTimeNs - offset;

                //     nanosleep(&offDelay, NULL);
                //     time = chrono::high_resolution_clock::now();
                // }
                // time = chrono::high_resolution_clock::now();
            }
        },
        [](uv_work_t *req, int status)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data);
            gpiod::line line = data->line;
            line.release();

            delete req;
            delete data;
        });

    Napi::Function dutyCycleSetter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                         {
        double dutyCycle = info[0].As<Napi::Number>().DoubleValue();

        // printf("Setting Duty Cycle: %f\n", dutyCycle);
        data->dutyCycle = dutyCycle; });

    Napi::Function frequencySetter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                         {
        int frequency = info[0].As<Napi::Number>().Int32Value();

        // printf("Setting Frequency: %d\n", frequency);
        data->frequency = frequency; });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                 { data->active = false; });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, dutyCycleSetter);
    arr.Set(1u, frequencySetter);
    arr.Set(2u, cleanup);

    return arr;
}

Napi::String Info(const Napi::CallbackInfo &info)
{
    return Napi::String::New(info.Env(), "Built for the wanderers, the explorers, the adventurers of the world. For those who want to see the world, not read about it. For those who want to get out there and experience it all. For those who want to live their dreams, not sleep through them. For those who want to see the world their way. Adventure belongs to the couragous. Exploration Systems.");
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports["info"] = Napi::Function::New(env, Info);
    exports["input"] = Napi::Function::New(env, GpioInput);
    exports["output"] = Napi::Function::New(env, GpioOutput);
    exports["watch"] = Napi::Function::New(env, GpioWatch);
    exports["pwm"] = Napi::Function::New(env, GpioPwm);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)