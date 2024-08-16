# OpenGPIO

A performant c++ based general purpose GPIO controller for linux devices.
OpenGPIO is written using libgpiod, line & chip based abstractions.

While this library can be used on most devices, you'll need to know the chip and line numbers corrisponding to the GPIO pin you want to access. This information can usually be found in the datasheet for your devices SOC. If all that sounds way to complicated, you can make use of one of the official device drivers which already have the bcm and board pin mappings for GPIO pins.

## Prerequisites

-   **libgpiod 2.1**

    Libgpiod 2.1 needs to be built from source (Don't worry it's easy).

    ``` sh
    # Ensure build dependancies
    sudo apt install tar gzip build-essential autoconf curl autoconf-archive
    
    # Fetch libgpiod
    curl -o libgpiod-2.1.tar.gz 'https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/snapshot/libgpiod-2.1.tar.gz'
    tar xf libgpiod-2.1.tar.gz
    cd libgpiod-2.1
    
    # Make libgpiod
    ./autogen.sh --enable-bindings-cxx
    make
    sudo make install
    ```

    **Debugging**
    If after installing libgpiod you encounter issues loading libgpiod with errors like: `Error: libgpiodcxx.so.2: cannot open shared object file: No such file or directory`, you may need to update the system library cache. You can do this by running: `sudo ldconfig`

## Supported Features

-   GPIO - General purpose input output.
-   PWM (via GPIO) - GPIO based pulse width modulation.
-   Events - Event callbacks for rising, falling, or both edges.

## Unsupported Features

-   Native PWM - This library does not yet support native PWM, only emulated PWM via GPIO.
-   I2C - Use the openi2c library for common i2c module drivers (still highly WIP), or alternatively we recommending using the i2c-bus library directly.

## Official Device Drivers

-   RaspberryPi 2B
-   RaspberryPi 3B
-   RaspberryPi 3B+
-   RaspberryPi 400
-   RaspberryPi 4B
-   RaspberryPi 5B
-   RaspberryPi Zero2W
-   RaspberryPi ZeroW
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

## Local Development

There's a good chance you are developing your software on a separate system from where it will finally run. In this case opengpio may not be compatible with your system. For example, developing on Windows or Mac for later deployment to Raspberry Pi. In these cases, you can install the library locally using `npm i --save opengpio --ignore-scripts` to prevent npm from running build when it installs. Since bindings will not exist, you will need to tell opengpio not to load the bindings when it imports the library. You can do this by setting the environment variable `OPENGPIO_MOCKED=true`. This will prevent opengpio from loading the native bindings and instead all functions will be replaced with mock functions that don't call the native bindings. 

If you have a case where you need to detect if the library is running with mocked bindings you can check a parameter called "mocked", exported from the library.

```js
import opengpio from 'opengpio';
if(opengpio.mocked) {
    console.log('opengpio is running with mocked bindings');
}
```
