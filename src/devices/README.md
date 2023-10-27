# Devices

Devices can be added into this folder. A device consists of a simple mapping from the pin numbers and gpio references to a Gpio object which contains the chip and line for libgpio.

# Gpio Banks

It's unclear at the time of writing if all devices use a similar naming structure for gpio references to refer to the gpio bank. However, when creating this for the NanoPi NEO3, one could calculate the chip and line from the gpio reference using the following formula below.

## Determining Chip / Line (BCM Pins)

Given the BCM pin reference **GPIO2_C3**, one should expect the chip to be **2**, and the line to be **19**.

This is inferred using the following algorithm:

-   [chip, line] = [GPIO2, C3]: Split the gpio refernce on the \_.
-   chip = 2 (GPIO[2]): Get the chip number from the number after GPIO.
-   line = 8 x 2 (A=0, B=1, C=2, D=3)[C] + 2 (C[2]): Get the line by multiplying the 8 by the letter's corrisponding number and then adding the number after the letter.

## Example Functional Implementation

Below is example typescript code that would implement the algorithm above.

```js
enum Group {
    A = 0,
    B = 1,
    C = 2,
    D = 3
}

function getGpio(gpioRef: string): Gpio {
    const [bank, set] = gpioRef.split('_') as [string, string];
    const setKey = set[0] as 'A' | 'B' | 'C' | 'D';

    return {
        line: 8 * Group[setKey] + parseInt(set[1]),
        chip: parseInt(bank.replace('GPIO', ''))
    };
}
```

## Remarks

I don't assume that the same will hold true for all devices, but I'm sure there will be some similarities and learnings from this process that can be applied to mappings for other devices.

### Refernces

-   BCM Pins = "Broadcom SOC channel"
