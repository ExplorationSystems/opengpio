import lib from '../lib';
import { CleanupCallback, Gpio, PinGetter, PinSetter, GpioOptions } from '../types';

export enum Direction {
    Input,
    Output,
}

// TODO Make separate input / output classes with parent abstract class.
export class Pin {
    private getter: PinGetter = () => false;
    private setter: PinSetter = () => { };
    private cleanup: CleanupCallback = () => { };

    constructor(gpio: Gpio, readonly direction: Direction, options: GpioOptions = {}) {
        if (direction === Direction.Input) {
            // TODO Update chip to string and naming of line to offset
            const [getter, cleanup] = lib.input('/dev/gpiochip' + gpio.chip, gpio.line, options.bias ?? 0, options.debounce ?? 0)
            this.getter = getter;
            this.cleanup = cleanup;
        } else if (direction === Direction.Output) {
            const [setter, cleanup] = lib.output(gpio.chip, gpio.line)
            this.setter = setter;
            this.cleanup = cleanup;
        }
    }

    stop() {
        this.cleanup();
    }

    get value() {
        return this.getter();
    }

    set value(value: boolean) {
        this.setter(value);
    }
}
