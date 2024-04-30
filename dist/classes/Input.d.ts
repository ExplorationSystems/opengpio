import { Gpio, GpioInputOptions } from '../types';
export declare class Input {
    private getter;
    private cleanup;
    constructor(gpio: Gpio, options?: GpioInputOptions);
    stop(): void;
    get value(): boolean;
}
