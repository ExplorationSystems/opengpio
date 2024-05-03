import { CleanupCallback, DutyCycleSetter, FrequencySetter, Gpio, GpioOutputOptions } from "../types";
import { bindings } from '../bindings';

export class Pwm {
    private dutyCycleSetter: DutyCycleSetter = () => { };
    private frequencySetter: FrequencySetter = () => { };
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;


    constructor(private gpio: Gpio, private dutyCycle: number, private frequency: number = 50, options: GpioOutputOptions = {}) {
        // Currently options is not used by lib.pwm but is added for future parameters.
        const [setDutyCycle, setFrequency, cleanup] = bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
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