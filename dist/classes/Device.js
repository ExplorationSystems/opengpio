"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const Pwm_1 = require("./Pwm");
const Watch_1 = require("./Watch");
const Input_1 = require("./Input");
const Output_1 = require("./Output");
class Device {
    static input(gpio, options = {}) {
        return new Input_1.Input(gpio, options);
    }
    static output(gpio, options = {}) {
        return new Output_1.Output(gpio, options);
    }
    static watch(gpio, edge, options = {}) {
        return new Watch_1.Watch(gpio, edge, options);
    }
    static pwm(gpio, dutyCycle, frequency, options = {}) {
        return new Pwm_1.Pwm(gpio, dutyCycle, frequency, options);
    }
}
exports.Device = Device;
Device.board = {};
Device.bcm = {};
