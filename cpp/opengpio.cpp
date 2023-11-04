#include <napi.h>
#include <iostream>
#include <gpiod.hpp>
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
    line.request({resourceName, gpiod::line_request::DIRECTION_INPUT, 0});

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
    line.request({resourceName, gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);

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
    // Napi::ThreadSafeFunction threadSafeWatchCallback;
};

Napi::Array GpioWatch(Napi::CallbackInfo const &info)
{
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();
    Napi::Function watchCallback = info[2].As<Napi::Function>();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    string resourceName = "opengpio_" + to_string(chipNumber) + "_" + to_string(lineNumber) + "_watch";

    // Napi::ThreadSafeFunction threadSafeWatchCallback = Napi::ThreadSafeFunction::New(
    //     info.Env(), watchCallback, resourceName + "_callback", 0, 1, [](Napi::Env) {});

    line.request({resourceName, gpiod::line_request::EVENT_BOTH_EDGES, 0}, 0);

    WatchContext *data = new WatchContext();
    data->line = line;
    data->active = true;
    // data->threadSafeWatchCallback = threadSafeWatchCallback;

    uv_work_t *req = new uv_work_t;
    req->data = data;

    uv_queue_work(
        uv_default_loop(), req,
        [](uv_work_t *req)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data); // Get the data
            gpiod::line line = data->line;
            // This is the function that will be executed in the worker (separate) thread
            while (data->active)
            { // Continuous loop to generate PWM
                // bool hasEvent = line.event_wait(chrono::milliseconds(1000));
                sleep(1);
                // if (hasEvent)
                // {
                //     gpiod::line_event event = line.event_read();
                //     bool value = event.event_type == gpiod::line_event::RISING_EDGE ? true : false;
                //     // data->threadSafeWatchCallback.BlockingCall(new bool(value), [](Napi::Env env, Napi::Function watchCallback, bool *value)
                //     //                                            {
                //     //                                             watchCallback.Call({Napi::Boolean::New(env, *value)});
                //     //                                             delete value; });
                // }
            }

            printf("Finished\n");
        },
        [](uv_work_t *req, int status)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data);
            // // data->threadSafeWatchCallback.Release();
            data->line.release();

            delete req;
            delete data;
            printf("Done\n");
        });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                 {
        printf("Cleanup\n");
        data->active = false; });

    Napi::Array arr = Napi::Array::New(info.Env(), 1);
    arr.Set(0u, cleanup);

    return arr;
}

struct PwmContext
{
    int frequency;
    double dutyCycle;
    bool active;
    gpiod::line line;
};

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
    line.request({resourceName, gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);

    PwmContext *data = new PwmContext();
    data->frequency = frequency;
    data->dutyCycle = dutyCycle;
    data->line = line;
    data->active = true;

    uv_loop_t *loop = uv_default_loop();
    uv_work_t work_req;
    work_req.data = data;

    uv_queue_work(
        loop, &work_req,
        [](uv_work_t *req)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data); // Get the data
            gpiod::line line = data->line;
            // This is the function that will be executed in the worker (separate) thread
            while (data->active)
            { // Continuous loop to generate PWM
                int frequency = data->frequency;
                double dutyCycle = data->dutyCycle;
                double period = 1.0 / frequency;
                double onTime = period * dutyCycle;
                double offTime = period - onTime;
                int onTimeUs = onTime * 1e6;
                int offTimeUs = offTime * 1e6;

                if (onTimeUs > 0)
                {
                    line.set_value(true);
                    usleep(onTimeUs);
                }

                if (offTimeUs > 0)
                {
                    line.set_value(false);
                    usleep(offTimeUs);
                }
            }
        },
        [](uv_work_t *req, int status)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data);
            gpiod::line line = data->line;
            line.release();
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