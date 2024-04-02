"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pwm = void 0;
const lib_1 = __importDefault(require("../lib"));
class Pwm {
    constructor(gpio, dutyCycle, frequency = 50) {
        this.gpio = gpio;
        this.dutyCycle = dutyCycle;
        this.frequency = frequency;
        this.dutyCycleSetter = () => { };
        this.frequencySetter = () => { };
        this.cleanup = () => { };
        this.stopped = false;
        const [setDutyCycle, setFrequency, cleanup] = lib_1.default.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        console.log(setDutyCycle, setFrequency, cleanup);
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
