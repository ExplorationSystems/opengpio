import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
export declare class Device {
    static board: Record<number, Gpio>;
    static bcm: Record<string, Gpio>;
    static input(gpio: Gpio, options?: Omit<GpioInputOptions, 'debounce'>): Input;
    static output(gpio: Gpio, options?: GpioOutputOptions): Output;
    static watch(gpio: Gpio, edge: Edge, options?: GpioInputOptions): Watch;
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number, options?: GpioOutputOptions): Pwm;
}
