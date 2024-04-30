import lib from '../lib';
import { CleanupCallback, Gpio, PinGetter, PinSetter, GpioInputOptions } from '../types';

export class Input {
    private getter: PinGetter = () => false;
    private cleanup: CleanupCallback = () => { };

    constructor(gpio: Gpio, options: GpioInputOptions = {}) {
        const [getter, cleanup] = lib.input(gpio.chip, gpio.line, options.bias ?? 0)
        this.getter = getter;
        this.cleanup = cleanup;
    }

    stop() {
        this.cleanup();
    }

    get value() {
        return this.getter();
    }
}
