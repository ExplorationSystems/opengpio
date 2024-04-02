import { Gpio } from "../types";
export declare class Pwm {
    private gpio;
    private dutyCycle;
    private frequency;
    private dutyCycleSetter;
    private frequencySetter;
    private cleanup;
    private stopped;
    constructor(gpio: Gpio, dutyCycle: number, frequency?: number);
    stop(): void;
    setDutyCycle(dutyCycle: number): void;
    setFrequency(frequency: number): void;
}
