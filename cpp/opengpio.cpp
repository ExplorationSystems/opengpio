#include <napi.h>

// Just a dramatic intro to test that the module is working
Napi::Boolean GetGpio(Napi::CallbackInfo const& info){
  Napi::Env env = info.Env();
  return Napi::Boolean::New(env, true);
}

Napi::Void SetGpio(Napi::CallbackInfo const& info){
  Napi::Env env = info.Env();
  return Napi::Void::New(env);
}

Napi::Void WatchGpio(Napi::CallbackInfo const& info){
  Napi::Env env = info.Env();
  return Napi::Void::New(env);
}

Napi::Void PwmGpio(Napi::CallbackInfo const& info){
  Napi::Env env = info.Env();
  return Napi::Void::New(env);
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