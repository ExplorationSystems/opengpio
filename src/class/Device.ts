import { Edge, Gpio } from '../types';
import { Pwm } from './Pwm';
import { Direction, Pin } from './Pin';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static input(gpio: Gpio) {
        return new Pin(gpio, Direction.Input);
    }
    static output(gpio: Gpio) {
        return new Pin(gpio, Direction.Output);
    }
    static watch(
        gpio: Gpio,
        edge: Edge,
        callback: (value: boolean) => void
    ) {

    }
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number) {
        return new Pwm(gpio, dutyCycle, frequency);
    }
}
