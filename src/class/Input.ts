import lib from '../lib';
import { Gpio } from '../types';

export class Input {
    private getter: () => boolean;
    constructor(gpio: Gpio) {
        this.getter = lib.input(gpio.chip, gpio.line);
    }

    close() {
        // this.cleanup();
    }

    get() {
        const value = this.getter();
        return value;
    }
}
