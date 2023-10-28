import lib from '../lib';
import { Gpio, Pin } from '../types';

export class Output implements Pin {
    private setter: (value: boolean) => void;
    constructor(gpio: Gpio) {
        this.setter = lib.output(gpio.chip, gpio.line);
    }

    close() {
        // this.cleanup();
    }

    set(value: boolean) {
        this.setter(value);
    }
}
