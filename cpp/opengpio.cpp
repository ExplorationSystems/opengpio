#include <napi.h>
#include <iostream>
#include "./libgpiod/bindings/cxx/gpiod.hpp"
#include <unistd.h>
#include <uv.h>
using namespace std;

Napi::Array GpioInput(Napi::CallbackInfo const &info)
{
    int chip_number = info[0].As<Napi::Number>().Int32Value(); // TODO should this be chip path?
    int line_offset = info[1].As<Napi::Number>().Int32Value();
    string consumer_name = "opengpio_" + to_string(chip_number) + "_" + to_string(line_offset) + "_input";

    auto request =
        ::gpiod::chip(chip_number)
            .prepare_request()
            .set_consumer(consumer_name)
            .add_line_settings(
                line_offset,
                ::gpiod::line_settings()
                    .set_direction(
                        ::gpiod::line::direction::INPUT)
                    .set_edge_detection(
                        ::gpiod::line::edge::BOTH)
                    .set_bias(::gpiod::line::bias::PULL_UP)
                    .set_debounce_period(
                        std::chrono::milliseconds(10)))
            .do_request();
    gpiod::chip chip("gpiochip" + to_string(chip_number));
    gpiod::line line = chip.get_line(line_offset);

    // try
    // {
    //     line.request({resourceName, gpiod::line_request::DIRECTION_INPUT, 0});
    // }
    // catch (const std::exception &e)
    // {
    //     Napi::Error error = Napi::Error::New(info.Env(), e.what());
    //     error.ThrowAsJavaScriptException();
    //     return Napi::Array::New(info.Env());
    // }

    // Napi::Function getter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
    //                                             {
    //     bool value = line.get_value();
    //     return Napi::Boolean::New(info.Env(), value); });

    // Napi::Function cleanup = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info)
    //                                              { line.release(); });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
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