"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pwm = void 0;
const bindings_1 = require("../bindings");
class Pwm {
    constructor(gpio, dutyCycle, frequency = 50, options = {}) {
        this.gpio = gpio;
        this.dutyCycle = dutyCycle;
        this.frequency = frequency;
        this.dutyCycleSetter = () => { };
        this.frequencySetter = () => { };
        this.cleanup = () => { };
        this.stopped = false;
        // Currently options is not used by lib.pwm but is added for future parameters.
        const [setDutyCycle, setFrequency, cleanup] = bindings_1.bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
        this.cleanup = cleanup;
    }
    stop() {
        this.stopped = true;
        this.cleanup();
    }
    setDutyCycle(dutyCycle) {
        if (this.stopped) {
            throw new Error('Cannot set duty cycle on stopped pwm');
        }
        this.dutyCycle = dutyCycle;
        this.dutyCycleSetter(dutyCycle);
    }
    setFrequency(frequency) {
        if (this.stopped) {
            throw new Error('Cannot set frequency on stopped pwm');
        }
        this.frequency = frequency;
        this.frequencySetter(frequency);
    }
}
exports.Pwm = Pwm;
