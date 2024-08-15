# OpenGPIO

A performant c++ based general purpose GPIO controller for linux devices.
OpenGPIO is written using libgpiod, line & chip based abstractions.

While this library can be used on most devices, you'll need to know the chip and line numbers corrisponding to the GPIO pin you want to access. This information can usually be found in the datasheet for your devices SOC. If all that sounds way to complicated, you can make use of one of the official device drivers which already have the bcm and board pin mappings for GPIO pins.

## Prerequisites

-   libgpiod: `sudo apt install -y libgpiod-dev` - This library requires libgpiod-dev to be installed before installing via npm.

## Supported Features

-   GPIO - General purpose input output.
-   PWM (via GPIO) - GPIO based pulse width modulation.
-   Events - Event callbacks for rising, falling, or both edges.

## Unsupported Features

-   PWM (Native PWM) - This library does not yet support native PWM, only emulated PWM via GPIO.
-   I2C - We recommending using the i2c-bus library directly.

## Official Device Drivers

-   RaspberryPi 2B
-   RaspberryPi 3B
-   RaspberryPi 3B+
-   RaspberryPi 400
-   RaspberryPi 4B
-   RaspberryPi 5B
-   RaspberryPi Zero2W
-   RaspberryPi ZeroW
-   OrangePi 5
-   OrangePi CM5
-   NanoPI NEO3

## Using An Official Driver

Using an official device driver is simple, just import the device by its name.

```ts
import { NanoPi_NEO3, Edge } from 'opengpio';

// GPIO Output
const output = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO3_B0);
output.value = true; // Set the NanoPi_NEO3's GPIO3_B0 pin high
output.value = false; // Set the NanoPi_NEO3's GPIO3_B0 pin low

// GPIO Input
const input = NanoPi_NEO3.input(NanoPi_NEO3.bcm.GPIO3_B0);
console.log(input.value); // Gets the NanoPi_NEO3's GPIO3_B0 pin high/low value as true/false

// GPIO Events
// Creates a listener for events on the NanoPi_NEO3's GPIO3_B0 pin for both Rising and Falling edges.
// Available Events: "change", "rise", "fall"
const watch = NanoPi_NEO3.watch(NanoPi_NEO3.bcm.GPIO3_B0, Edge.Both);
watch.on('change', (value) => {
    console.log(value); // Contains the high/low value as true/false
});

// Get the current value of the watch
console.log(watch.value);

// GPIO PWM
// Creates a 50hz (20ms) PWM on the NanoPi NEO3's GPIO3_B0 pin, with a duty cycle of 10% (2ms)
const pwm = NanoPi_NEO3.pwm(NanoPi_NEO3.bcm.GPIO3_B0, 0.1, 50);
pwm.setDutyCycle(0.2); // Updates the duty cycle of the pwm to 20% (4ms)
```

## Using An Unofficial Driver

If no official driver exists, you can use the Default device and provide the chip and line numbers directly. Otherwise, usage is identical.

```ts
import { Default, Edge } from 'opengpio';

// GPIO Output
const output = Default.output({ chip: 0, line: 27 });
output.value = true; // Set the pin high at chip 0 line 27
```
