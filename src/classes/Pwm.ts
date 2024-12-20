import { CleanupCallback, DutyCycleSetter, FrequencySetter, Gpio } from "../types";
import lib from '../lib';

export class Pwm {
    private dutyCycleSetter: DutyCycleSetter = () => { };
    private frequencySetter: FrequencySetter = () => { };
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;


    constructor(private gpio: Gpio, private dutyCycle: number, private frequency: number = 50) {
        const [setDutyCycle, setFrequency, cleanup] = lib.pwm(gpio.chip, gpio.line, dutyCycle, frequency);

        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
        this.cleanup = cleanup;
    }

    stop() {
        this.stopped = true;
        this.cleanup();
    }

    setDutyCycle(dutyCycle: number) {
        if (this.stopped) {
            throw new Error('Cannot set duty cycle on stopped pwm');
        }
        this.dutyCycle = dutyCycle;
        this.dutyCycleSetter(dutyCycle);
    }

    setFrequency(frequency: number) {
        if (this.stopped) {
            throw new Error('Cannot set frequency on stopped pwm');
        }
        this.frequency = frequency;
        this.frequencySetter(frequency);
    }
}