import { Gpio } from '../types';
export declare enum Direction {
    Input = 0,
    Output = 1
}
export declare class Pin {
    private readonly gpio;
    private readonly direction;
    private getter;
    private setter;
    private cleanup;
    constructor(gpio: Gpio, direction: Direction);
    stop(): void;
    get value(): boolean;
    set value(value: boolean);
}
