import { Gpio } from "../types";
import { ChildProcess } from 'child_process';
import opengpio from '../driver';

export class PWM {
    process?: ChildProcess;
    constructor(private gpio: Gpio, private dutyCycle: number, private frequency: number = 50) {
        this.process = opengpio.pwm(gpio, dutyCycle, frequency);
    }

    stop() {
        if (this.process) {
            this.process.kill();
            this.process = undefined;
        }
    }

    start() {
        this.stop();
        this.process = opengpio.pwm(this.gpio, this.dutyCycle, this.frequency);
    }

    setDutyCycle(dutyCycle: number) {
        this.dutyCycle = dutyCycle;
        this.start();
    }

    setFrequency(frequency: number) {
        this.stop();
        this.frequency = frequency;
        this.start();
    }
}