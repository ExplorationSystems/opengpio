import { Edge, Gpio } from '../types';
import opengpio from '../driver';
import { PWM } from './PWM';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static get(pin: number | string) {
        return opengpio.get(this.getGpio(pin));
    }
    static set(pin: number | string, value: boolean) {
        return opengpio.set(this.getGpio(pin), value);
    }
    static watch(
        pin: number | string,
        edge: Edge,
        callback: (value: boolean) => void
    ) {
        return opengpio.watch(this.getGpio(pin), edge, callback);
    }
    static pwm(pin: number | string, dutyCycle: number, frequency: number) {
        return new PWM(this.getGpio(pin), dutyCycle, frequency);
    }

    private static getGpio(pin: number | string): Gpio {
        const isBoardMapping = typeof pin === 'number';
        if (isBoardMapping) {
            return this.board[pin as number];
        } else {
            return this.bcm[pin as string];
        }
    }
}
