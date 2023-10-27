# Devices

New devices can be added into this folder. A device should extend the Device class and should implement a simple mapping from the board pin numbers and bcm pin references, which map to Gpio object that contains the chip and line for libgpio.

## Implementing A New Device

To implement a new device:

-   Copy **\_template.ts** and rename it to your new device, using the following naming convention: Device Name + "\_" + Device Version, in PascalCase or in the manufacturer's preferred case. For example:
    -   RaspberryPi_3B
    -   NanoPi_NEO3 (The provider uses all caps when writing the version name, therefore we should use the providers preferred case instead of PascalCase which would have been Neo3)
-   Inside your copied template file, rename **TemplateDevice** to device name, using the same naming convention used for the file name.
-   Implement the board and bcm mappings so they match the providers naming and numbering conventions. You will probably need to do some research on the device to find out which gpio bank (chip and line), the pin references in the device. A good start would be the datasheet for the device of the SOC. For example, the NanoPi NEO3 uses the RockChip RK3328 SOC, and so the RK3328 datasheet would be a good place to start when looking at these mappings. If a device uses the same SOC as an existing device, you might be able to copy the existing device file as a starting point, but note that different manufacturers might use different naming conventions for pins.
-   Export your device from within the devices barrel file (src/devices/index.ts) using the same naming conventions for the device.
-   When complete, create a pull request on the repository to submit your device for others to use.

## Gpio

It's unclear at the time of writing if all devices use a similar naming structure for gpio references to refer to the gpio bank. However, when creating this for the NanoPi NEO3, one could calculate the chip and line from the gpio reference using the following formula below.

### Determining Chip / Line (BCM Pins)

Given the BCM pin reference **GPIO2_C3**, one should expect the chip to be **2**, and the line to be **19**.

This is inferred using the following algorithm:

-   [chip, line] = [GPIO2, C3]: Split the gpio refernce on the \_.
-   chip = 2 (GPIO[2]): Get the chip number from the number after GPIO.
-   line = 8 x 2 (A=0, B=1, C=2, D=3)[C] + 2 (C[2]): Get the line by multiplying the 8 by the letter's corrisponding number and then adding the number after the letter.

### Example Functional Implementation

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

#### Remarks

I don't assume that the same will hold true for all devices, but I'm sure there will be some similarities and learnings from this process that can be applied to mappings for other devices.

## Refernces

-   BCM Pins = "Broadcom SOC channel"
