/// <reference types="node" />
import { ChildProcess } from 'child_process';
export declare enum Edge {
    Rising = 0,
    Falling = 1,
    Both = 2
}
export declare class Gpio {
    private device;
    private pin;
    constructor(device: Device, pin: keyof Device['gpio']);
    private get raster();
    get(): boolean;
    set(value: boolean): void;
    pwm(dutyCycle: number, frequency?: number): ChildProcess;
    pwmSync(dutyCycle: number, frequency?: number): void;
    watch(callback: (value: boolean) => void, edge?: Edge): ChildProcess;
    watchSync(callback: (value: boolean) => void, edge?: Edge): void;
}
