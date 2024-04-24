import { Edge, Gpio, GpioOptions } from '../types';
import { Pwm } from './Pwm';
import { Direction, Pin } from './Pin';
import { Watch } from './Watch';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static input(gpio: Gpio, options: GpioOptions = {}) {
        return new Pin(gpio, Direction.Input, options);
    }
    static output(gpio: Gpio) {
        return new Pin(gpio, Direction.Output);
    }
    static watch(
        gpio: Gpio,
        edge: Edge
    ) {
        return new Watch(gpio, edge);
    }
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number) {
        return new Pwm(gpio, dutyCycle, frequency);
    }
}
