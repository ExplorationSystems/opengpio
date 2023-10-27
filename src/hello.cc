#include <napi.h>

Napi::String Greet(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Hello, World!");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["greet"] = Napi::Function::New(env, Greet);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)