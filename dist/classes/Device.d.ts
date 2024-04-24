import { Edge, Gpio, GpioOptions } from '../types';
import { Pwm } from './Pwm';
import { Pin } from './Pin';
import { Watch } from './Watch';
export declare class Device {
    static board: Record<number, Gpio>;
    static bcm: Record<string, Gpio>;
    static input(gpio: Gpio, options?: GpioOptions): Pin;
    static output(gpio: Gpio): Pin;
    static watch(gpio: Gpio, edge: Edge): Watch;
    static pwm(gpio: Gpio, dutyCycle: number, frequency: number): Pwm;
}
