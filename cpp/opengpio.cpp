#include <napi.h>
#include <iostream>
#include <gpiod.hpp>
#include <unistd.h>
#include <uv.h>
using namespace std;

Napi::Array GpioInput(Napi::CallbackInfo const &info)
{
    // Inputs
    int chip_number = info[0].As<Napi::Number>().Int32Value();
    std::string chip_path = "/dev/gpiochip" + to_string(chip_number);
    ::gpiod::line::offset line_offset = info[1].As<Napi::Number>().Int32Value(); // TODO can this use get_line_offset_from_name? Should try send from JS. See libgpiod examples for reference.
    int bias = info[2].As<Napi::Number>().Int32Value();

    // Resources
    ::gpiod::line_request *request = nullptr;
    std::string consumer_name = "opengpio_" + chip_path + "_" + to_string(line_offset) + "_input";

    // Setup
    try
    {
        ::gpiod::line_settings line_settings = ::gpiod::line_settings();
        line_settings.set_direction(
            ::gpiod::line::direction::INPUT);

        // Setup line bias, if 0 then don't run set_bias.
        if (bias >= 1 && bias <= 5)
        {
            // C++ Bias ::gpiod::line::bias has the following int references.
            // Bias enum: 1 = AS_IS, 2 = UNKNOWN, 3 = DISABLED, 4 = PULL_UP, 5 = PULL_DOWN
            line_settings.set_bias(static_cast<::gpiod::line::bias>(bias));
        }

        request = new ::gpiod::line_request(::gpiod::chip(chip_path)
                                                .prepare_request()
                                                .set_consumer(consumer_name)
                                                .add_line_settings(
                                                    line_offset,
                                                    line_settings)
                                                .do_request());
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    Napi::Function getter = Napi::Function::New(info.Env(), [request, line_offset](const Napi::CallbackInfo &info)
                                                {
    bool value = request->get_value(line_offset) == ::gpiod::line::value::ACTIVE ? true : false;
    return Napi::Boolean::New(info.Env(), value); });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [request](const Napi::CallbackInfo &info)
                                                 { request->release(); });

    // Outputs
    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

    return arr;
}

Napi::Array GpioOutput(Napi::CallbackInfo const &info)
{
    // Inputs
    int chip_number = info[0].As<Napi::Number>().Int32Value();
    std::string chip_path = "/dev/gpiochip" + to_string(chip_number);
    ::gpiod::line::offset line_offset = info[1].As<Napi::Number>().Int32Value(); // TODO can this use get_line_offset_from_name? Should try send from JS. See libgpiod examples for reference.

    // Resources
    ::gpiod::line_request *request = nullptr;
    std::string consumer_name = "opengpio_" + chip_path + "_" + to_string(line_offset) + "_output";

    // Setup
    try
    {
        ::gpiod::line_settings line_settings = ::gpiod::line_settings();
        line_settings.set_direction(
            ::gpiod::line::direction::OUTPUT);

        request = new ::gpiod::line_request(::gpiod::chip(chip_path)
                                                .prepare_request()
                                                .set_consumer(consumer_name)
                                                .add_line_settings(
                                                    line_offset,
                                                    line_settings)
                                                .do_request());
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    Napi::Function setter = Napi::Function::New(info.Env(), [request, line_offset](const Napi::CallbackInfo &info)
                                                {
        bool value = info[0].As<Napi::Boolean>().ToBoolean();
		request->set_value(line_offset, value == true ? ::gpiod::line::value::ACTIVE : ::gpiod::line::value::INACTIVE); });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [request](const Napi::CallbackInfo &info)
                                                 { request->release(); });

    // Outputs
    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, setter);
    arr.Set(1u, cleanup);

    return arr;
}

Napi::String Info(const Napi::CallbackInfo &info)
{
    return Napi::String::New(info.Env(), "Built for the wanderers, the explorers, the adventurers of the world. For those who want to see the world, not read about it. For those who want to get out there and experience it all. For those who want to live their dreams, not sleep through them. For those who want to see the world their way. Adventure belongs to the couragous.");
}

struct WatchContext
{
    bool active;
    ::gpiod::line_request *request;
    Napi::ThreadSafeFunction thread_safe_watch_callback;
};

Napi::Array GpioWatch(Napi::CallbackInfo const &info)
{
    // Inputs
    int chip_number = info[0].As<Napi::Number>().Int32Value();
    std::string chip_path = "/dev/gpiochip" + to_string(chip_number);
    ::gpiod::line::offset line_offset = info[1].As<Napi::Number>().Int32Value(); // TODO can this use get_line_offset_from_name? Should try send from JS. See libgpiod examples for reference.
    int debounce = info[2].As<Napi::Number>().Int32Value();
    int bias = info[3].As<Napi::Number>().Int32Value();
    Napi::Function watch_callback = info[4].As<Napi::Function>();

    // Resources
    ::gpiod::line_request *request = nullptr;
    string consumer_name = "opengpio_" + chip_path + "_" + to_string(line_offset) + "_watch";
    Napi::ThreadSafeFunction thread_safe_watch_callback = Napi::ThreadSafeFunction::New(
        info.Env(), watch_callback, consumer_name + "_callback", 0, 1, [](Napi::Env) {});

    // Setup
    try
    {
        ::gpiod::line_settings line_settings = ::gpiod::line_settings();
        line_settings
            .set_direction(::gpiod::line::direction::INPUT)
            .set_edge_detection(::gpiod::line::edge::BOTH);

        // Setup line bias, if 0 then don't run set_bias.
        if (bias >= 1 && bias <= 5)
        {
            // C++ Bias ::gpiod::line::bias has the following int references.
            // Bias enum: 1 = AS_IS, 2 = UNKNOWN, 3 = DISABLED, 4 = PULL_UP, 5 = PULL_DOWN
            line_settings.set_bias(static_cast<::gpiod::line::bias>(bias));
        }

        // Set debounce if provided in milliseconds
        if (debounce > 0)
        {
            line_settings.set_debounce_period(
                std::chrono::milliseconds(debounce));
        }

        request = new ::gpiod::line_request(::gpiod::chip(chip_path)
                                                .prepare_request()
                                                .set_consumer(consumer_name)
                                                .add_line_settings(
                                                    line_offset,
                                                    line_settings)
                                                .do_request());
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    WatchContext *data = new WatchContext();
    data->request = request;
    data->active = true;
    data->thread_safe_watch_callback = thread_safe_watch_callback;

    uv_work_t *req = new uv_work_t;
    req->data = data;

    Napi::Function getter = Napi::Function::New(info.Env(), [request, line_offset](const Napi::CallbackInfo &info)
                                                {
    bool value = request->get_value(line_offset) == ::gpiod::line::value::ACTIVE ? true : false;
    return Napi::Boolean::New(info.Env(), value); });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                 { data->active = false; });

    uv_queue_work(
        uv_default_loop(), req,
        [](uv_work_t *req)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data);
            ::gpiod::edge_event_buffer buffer(1);
            ::gpiod::line_request *request = data->request;

            while (data->active)
            {
                bool has_event = request->wait_edge_events(chrono::milliseconds(1));
                if (has_event)
                {
                    request->read_edge_events(buffer);

                    // ::gpiod::edge_event &event = buffer[0];
                    for (const auto &event : buffer)
                    {
                        bool value = event.type() == ::gpiod::edge_event::event_type::RISING_EDGE ? true : false;
                        data->thread_safe_watch_callback.BlockingCall(new bool(value), [](Napi::Env env, Napi::Function watch_callback, bool *value)
                                                                      {
                                                                    watch_callback.Call({Napi::Boolean::New(env, *value)});
                                                                    delete value; });
                    }
                }
            }
        },
        [](uv_work_t *req, int status)
        {
            WatchContext *data = static_cast<WatchContext *>(req->data);
            data->thread_safe_watch_callback.Release();
            data->request->release();

            delete req;
            delete data;
        });

    // Outputs
    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

    return arr;
}

struct PwmContext
{
    int frequency;
    double duty_cycle;
    int line_offset;
    bool active;
    ::gpiod::line_request *request;
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

    // Inputs
    int chip_number = info[0].As<Napi::Number>().Int32Value();
    std::string chip_path = "/dev/gpiochip" + to_string(chip_number);
    ::gpiod::line::offset line_offset = info[1].As<Napi::Number>().Int32Value(); // TODO can this use get_line_offset_from_name? Should try send from JS. See libgpiod examples for reference.
    double duty_cycle = info[2].As<Napi::Number>().DoubleValue();
    int frequency = info[3].As<Napi::Number>().Int32Value();

    // Resources
    ::gpiod::line_request *request = nullptr;
    string consumer_name = "opengpio_" + chip_path + "_" + to_string(line_offset) + "_pwm";

    // Setup
    try
    {
        ::gpiod::line_settings line_settings = ::gpiod::line_settings();
        line_settings
            .set_direction(::gpiod::line::direction::OUTPUT);

        request = new ::gpiod::line_request(::gpiod::chip(chip_path)
                                                .prepare_request()
                                                .set_consumer(consumer_name)
                                                .add_line_settings(
                                                    line_offset,
                                                    line_settings)
                                                .do_request());
    }
    catch (const std::exception &e)
    {
        Napi::Error error = Napi::Error::New(info.Env(), e.what());
        error.ThrowAsJavaScriptException();
        return Napi::Array::New(info.Env());
    }

    PwmContext *data = new PwmContext();
    data->frequency = frequency;
    data->duty_cycle = duty_cycle;
    data->request = request;
    data->active = true;
    data->line_offset = line_offset;

    uv_work_t *req = new uv_work_t;
    req->data = data;

    uv_queue_work(
        uv_default_loop(), req,
        [](uv_work_t *req)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data); // Get the data
            ::gpiod::line_request *request = data->request;
            int line_offset = data->line_offset;

            while (data->active)
            {
                int frequency = data->frequency;
                double duty_cycle = data->duty_cycle;
                double period = 1.0 / frequency;
                double on_time = period * duty_cycle;
                double off_time = period - on_time;
                long on_time_ns = on_time * 1e9;
                long off_time_ns = off_time * 1e9;

                request->set_value(line_offset, ::gpiod::line::value::ACTIVE);
                WaitBlocking(on_time_ns);

                request->set_value(line_offset, ::gpiod::line::value::INACTIVE);
                WaitBlocking(off_time_ns);
            }
        },
        [](uv_work_t *req, int status)
        {
            PwmContext *data = static_cast<PwmContext *>(req->data);
            data->request->release();

            delete req;
            delete data;
        });

    Napi::Function duty_cycle_setter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                           {
        double duty_cycle = info[0].As<Napi::Number>().DoubleValue();
        data->duty_cycle = duty_cycle; });

    Napi::Function frequency_setter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                          {
        int frequency = info[0].As<Napi::Number>().Int32Value();
        data->frequency = frequency; });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info)
                                                 { data->active = false; });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, duty_cycle_setter);
    arr.Set(1u, frequency_setter);
    arr.Set(2u, cleanup);

    return arr;
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
