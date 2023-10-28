#include <napi.h>
#include <iostream>
#include <gpiod.hpp>
#include <unistd.h>
using namespace std;

// Just a dramatic intro to test that the module is working
Napi::Boolean GetGpio(Napi::CallbackInfo const& info){
    Napi::Env env = info.Env();

    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();

    ::gpiod::chip chip("gpiochip" + to_string(chipNumber));
    auto line = chip.get_line(lineNumber);
    line.request({"opengpio", gpiod::line_request::DIRECTION_INPUT, 0});  

    bool value = line.get_value();
    line.release();

    printf("Get GPIO at: %d:%d -> %d\n", chipNumber, lineNumber, value);

    return Napi::Boolean::New(env, value);
}

void SetGpio(Napi::CallbackInfo const& info){
    //   Napi::Env env = info.Env();
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();
    int value = 1;//info[2].As<Napi::Number>().Int32Value();

    // ::gpiod::chip chip("gpiochip" + to_string(chipNumber));
    // auto line = chip.get_line(lineNumber);
    // line.request({"opengpio", gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);  
    // sleep(0.1);
    // line.set_value(value);
    // line.release();
    ::gpiod::chip chip("gpiochip0");
   
   auto line = chip.get_line(27);  // GPIO17
   line.request({"example", gpiod::line_request::DIRECTION_OUTPUT, 0},1);  
   
   sleep(0.1);
   
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.release();

    // printf("Set GPIO at: %d:%d -> %d\n", chipNumber, lineNumber,value);
}

void WatchGpio(Napi::CallbackInfo const& info){
    //   Napi::Env env = info.Env();
}

void PwmGpio(Napi::CallbackInfo const& info){
    //   Napi::Env env = info.Env();
}

Napi::String Info(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    return Napi::String::New(env, "Built for the wanderers, the explorers, the adventurers of the world. For those who want to see the world, not read about it. For those who want to get out there and experience it all. For those who want to live their dreams, not sleep through them. For those who want to see the world their way. Adventure belongs to the couragous. Exploration Systems.");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["info"] = Napi::Function::New(env, Info);
  exports["get"] = Napi::Function::New(env, GetGpio);
  exports["set"] = Napi::Function::New(env, SetGpio);
  exports["watch"] = Napi::Function::New(env, WatchGpio);
  exports["pwm"] = Napi::Function::New(env, PwmGpio);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)