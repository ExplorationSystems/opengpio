import { Edge, Gpio } from '../types';
import opengpio from '../driver';
import { PWM } from './PWM';
import lib from '../lib';
import { Direction, Pin } from './Pin';

type PinRef = number | string; // TODO This should be a union of all possible pin references on the device
export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    static input(pin: PinRef) {
        const gpio = this.getGpio(pin);
        return new Pin(gpio, Direction.Input);
    }
    static output(pin: PinRef) {
        const gpio = this.getGpio(pin);
        return new Pin(gpio, Direction.Output);
    }
    static watch(
        pin: PinRef,
        edge: Edge,
        callback: (value: boolean) => void
    ) {
        return opengpio.watch(this.getGpio(pin), edge, callback);
    }
    static pwm(pin: PinRef, dutyCycle: number, frequency: number) {
        return new PWM(this.getGpio(pin), dutyCycle, frequency);
    }

    private static getGpio(pin: PinRef): Gpio {
        const isBoardMapping = typeof pin === 'number';
        if (isBoardMapping) {
            return this.board[pin as number];
        } else {
            return this.bcm[pin as string];
        }
    }
}
