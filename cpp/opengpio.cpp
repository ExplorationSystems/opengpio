#include <napi.h>
#include <iostream>
#include <gpiod.hpp>
#include <unistd.h>
#include <uv.h>
using namespace std;

Napi::Array GpioInput(Napi::CallbackInfo const& info){
    Napi::Env env = info.Env();

    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    line.request({"opengpio", gpiod::line_request::DIRECTION_INPUT, 0});  

    Napi::Function getter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info){
        bool value = line.get_value();
        return Napi::Boolean::New(info.Env(), value); 
    });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info){
        line.release();
    });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, getter);
    arr.Set(1u, cleanup);

    return arr;
}

Napi::Array GpioOutput(Napi::CallbackInfo const& info){
    // Napi::Env env = info.Env();
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    line.request({"opengpio", gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);  

    Napi::Function setter = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info){
        bool value = info[0].As<Napi::Boolean>().ToBoolean();
        line.set_value(value);
    });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [line](const Napi::CallbackInfo &info){
        line.release();
    });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, setter);
    arr.Set(1u, cleanup);

    return arr;
}

void GpioWatch(Napi::CallbackInfo const& info){
}

struct PwmContext {
    int frequency;
    double dutyCycle;
    bool active;
    gpiod::line line;
};

Napi::Array GpioPwm(Napi::CallbackInfo const& info){
    // Napi::Env env = info.Env();
    int chipNumber = info[0].As<Napi::Number>().Int32Value();
    int lineNumber = info[1].As<Napi::Number>().Int32Value();
    double dutyCycle = info[2].As<Napi::Number>().DoubleValue();
    int frequency = info[3].As<Napi::Number>().Int32Value();


    printf("Pwm GPIO at: %d:%d -> %f:%d\n", chipNumber, lineNumber, dutyCycle, frequency);

    gpiod::chip chip("gpiochip" + to_string(chipNumber));
    gpiod::line line = chip.get_line(lineNumber);
    line.request({"opengpio", gpiod::line_request::DIRECTION_OUTPUT, 0}, 1);

    PwmContext* data = new PwmContext();
    data->frequency = frequency; 
    data->dutyCycle = dutyCycle;
    data->line = line;
    data->active = true;

    uv_loop_t *loop = uv_default_loop();
    uv_work_t work_req;
    work_req.data = data;

    uv_queue_work(loop, &work_req,
        [](uv_work_t *req) {
            PwmContext* data = static_cast<PwmContext*>(req->data);  // Get the data
            gpiod::line line = data->line;
            // This is the function that will be executed in the worker (separate) thread
            while (data->active) { // Continuous loop to generate PWM  
                int frequency = data->frequency;
                double dutyCycle = data->dutyCycle;
                double period = 1.0 / frequency;
                double on_time = period * dutyCycle;
                double off_time = period - on_time;
                int on_time_us = on_time * 1e6;
                int off_time_us = off_time * 1e6;
                
                if(on_time_us > 0){
                    line.set_value(true);
                    usleep(on_time_us);
                }

                if(off_time_us>0){
                    line.set_value(false);
                    usleep(off_time_us);
                }
            }
        },
        [](uv_work_t *req, int status) {
            PwmContext* data = static_cast<PwmContext*>(req->data);
            gpiod::line line = data->line;
            line.release();

            printf("Done\n");
            free(data);
        }
    );

    Napi::Function dutyCycleSetter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info){
        double dutyCycle = info[0].As<Napi::Number>().DoubleValue();

        printf("Setting Duty Cycle: %f\n", dutyCycle);
        data->dutyCycle = dutyCycle;
    });


    Napi::Function frequencySetter = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info){
        int frequency = info[0].As<Napi::Number>().Int32Value();

        printf("Setting Frequency: %d\n", frequency);
        data->frequency = frequency;
    });

    Napi::Function cleanup = Napi::Function::New(info.Env(), [data](const Napi::CallbackInfo &info){
        data->active = false;
    });

    Napi::Array arr = Napi::Array::New(info.Env(), 2);
    arr.Set(0u, dutyCycleSetter);
    arr.Set(1u, frequencySetter);
    arr.Set(2u, cleanup);

    return arr;
}

Napi::String Info(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    return Napi::String::New(env, "Built for the wanderers, the explorers, the adventurers of the world. For those who want to see the world, not read about it. For those who want to get out there and experience it all. For those who want to live their dreams, not sleep through them. For those who want to see the world their way. Adventure belongs to the couragous. Exploration Systems.");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["info"] = Napi::Function::New(env, Info);
  exports["input"] = Napi::Function::New(env, GpioInput);
  exports["output"] = Napi::Function::New(env, GpioOutput);
  exports["watch"] = Napi::Function::New(env, GpioWatch);
  exports["pwm"] = Napi::Function::New(env, GpioPwm);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)