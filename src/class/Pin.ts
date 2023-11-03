import lib from '../lib';
import { CleanupCallback, Gpio, PinGetter, PinSetter } from '../types';

export enum Direction {
    Input,
    Output,
}

export class Pin {
    private getter: PinGetter = () => false;
    private setter: PinSetter = () => {};
    private cleanup: CleanupCallback = () => {};

    constructor(private readonly gpio: Gpio, private readonly direction: Direction) {
        if (direction === Direction.Input) {
            const [getter, cleanup] = lib.input(gpio.chip, gpio.line)
            this.getter = getter;
            this.cleanup = cleanup;
        }else if (direction === Direction.Output) {
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

    set value(value:boolean) {
        this.setter(value);
    }
}
