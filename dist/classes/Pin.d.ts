import { Gpio, GpioOptions } from '../types';
export declare enum Direction {
    Input = 0,
    Output = 1
}
export declare class Pin {
    readonly direction: Direction;
    private getter;
    private setter;
    private cleanup;
    constructor(gpio: Gpio, direction: Direction, options?: GpioOptions);
    stop(): void;
    get value(): boolean;
    set value(value: boolean);
}
