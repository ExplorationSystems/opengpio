import lib from '../lib';
import { Gpio } from '../types';

export enum Direction {
    Input,
    Output,
}

export class Pin {
    protected getter: () => boolean = () => false;
    protected setter: (value:boolean) => void = () => {};
    protected release: () => void = () => {};

    constructor(private readonly gpio: Gpio, private readonly direction: Direction) {
        if (direction === Direction.Input) {
            const [getter, release] = lib.input(gpio.chip, gpio.line)
            this.getter = getter;
            this.release = release;
        }else if (direction === Direction.Output) {
            const [setter, release] = lib.output(gpio.chip, gpio.line)
            this.setter = setter;
            this.release = release;
        }
    }

    close() {
        this.release();
    }
    
    get value() {
        return this.getter();
    }

    set value(value:boolean) {
        this.setter(value);
    }
}
