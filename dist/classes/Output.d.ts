import { Gpio, GpioOutputOptions } from '../types';
export declare class Output {
    private setter;
    private cleanup;
    constructor(gpio: Gpio, options?: GpioOutputOptions);
    stop(): void;
    set value(value: boolean);
}
