import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Direction, Pin } from './Pin';
import { Watch } from './Watch';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static input(gpio: Gpio, options: Omit<GpioInputOptions, 'debounce'> = {}) {
        return new Pin(gpio, Direction.Input, options);
    }
    static output(gpio: Gpio, options: GpioOutputOptions = {}) {
        return new Pin(gpio, Direction.Output, options);
    }
    static watch(
        gpio: Gpio,
        edge: Edge,
        options: GpioInputOptions = {}
    ) {
        return new Watch(gpio, edge, options);
    }
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number) {
        return new Pwm(gpio, dutyCycle, frequency);
    }
}
