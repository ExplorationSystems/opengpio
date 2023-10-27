#include <napi.h>

// Just a dramatic intro to test that the module is working
Napi::String Info(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Built for the wanderers, the explorers, the adventurers of the world. For those who want to see the world, not read about it. For those who want to get out there and experience it all. For those who want to live their dreams, not sleep through them. For those who want to see the world their way. Adventure belongs to the couragous. Exploration Systems.");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["info"] = Napi::Function::New(env, Info);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)