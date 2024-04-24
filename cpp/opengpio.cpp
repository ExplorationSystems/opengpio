#include <napi.h>
#include <iostream>
#include "./libgpiod/bindings/cxx/gpiod.hpp"
#include <unistd.h>
#include <uv.h>
using namespace std;

Napi::Array GpioInput(Napi::CallbackInfo const &info)
{
    std::string chip_path = info[0].As<Napi::String>().Utf8Value();              // TODO should this be chip path? Eg /dev/gpiochip0? Perhaps this should be sent from JS
    ::gpiod::line::offset line_offset = info[1].As<Napi::Number>().Int32Value(); // TODO can this use get_line_offset_from_name? Should try send from JS. See libgpiod examples for reference.
    int bias = info[2].As<Napi::Number>().Int32Value();
    int debounce = info[3].As<Napi::Number>().Int32Value();

    ::gpiod::line_request *request = nullptr;

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

        // Set debounce if provided in milliseconds
        // TODO debounce only relevant on watch
        if (debounce > 0)
        {
            line_settings.set_debounce_period(
                std::chrono::milliseconds(debounce));
        }

        request = new ::gpiod::line_request(::gpiod::chip(chip_path)
                                                .prepare_request()
                                                .set_consumer("opengpio_" + chip_path + "_" + to_string(line_offset) + "_input")
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

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

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
    // exports["output"] = Napi::Function::New(env, GpioOutput);
    // exports["watch"] = Napi::Function::New(env, GpioWatch);
    // exports["pwm"] = Napi::Function::New(env, GpioPwm);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)