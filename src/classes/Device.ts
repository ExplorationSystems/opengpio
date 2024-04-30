import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static input(gpio: Gpio, options: Omit<GpioInputOptions, 'debounce'> = {}) {
        return new Input(gpio, options);
    }
    static output(gpio: Gpio, options: GpioOutputOptions = {}) {
        return new Output(gpio, options);
    }
    static watch(
        gpio: Gpio,
        edge: Edge,
        options: GpioInputOptions = {}
    ) {
        return new Watch(gpio, edge, options);
    }
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number, options: GpioOutputOptions = {}) {
        return new Pwm(gpio, dutyCycle, frequency, options);
    }
}
