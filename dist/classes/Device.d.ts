import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Pin } from './Pin';
import { Watch } from './Watch';
export declare class Device {
    static board: Record<number, Gpio>;
    static bcm: Record<string, Gpio>;
    static input(gpio: Gpio, options?: Omit<GpioInputOptions, 'debounce'>): Pin;
    static output(gpio: Gpio, options?: GpioOutputOptions): Pin;
    static watch(gpio: Gpio, edge: Edge, options?: GpioInputOptions): Watch;
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number, options?: GpioOutputOptions): Pwm;
}
