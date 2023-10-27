#include <napi.h>
#include <iostream>
using namespace std;

// Just a dramatic intro to test that the module is working
Napi::Boolean GetGpio(Napi::CallbackInfo const& info){
    cout << "Running GetGpio()\n";
    Napi::Env env = info.Env();
    return Napi::Boolean::New(env, true);
}

void SetGpio(Napi::CallbackInfo const& info){
    cout << "Running SetGpio()\n";
    //   Napi::Env env = info.Env();
}

void WatchGpio(Napi::CallbackInfo const& info){
    cout << "Running WatchGpio()\n";
    //   Napi::Env env = info.Env();
}

void PwmGpio(Napi::CallbackInfo const& info){
    cout << "Running PwmGpio()\n";
    //   Napi::Env env = info.Env();
}

Napi::String Info(const Napi::CallbackInfo& info) {
    cout << "Running Info()\n";
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