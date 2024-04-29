"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const Pwm_1 = require("./Pwm");
const Pin_1 = require("./Pin");
const Watch_1 = require("./Watch");
class Device {
    static input(gpio, options = {}) {
        return new Pin_1.Pin(gpio, Pin_1.Direction.Input, options);
    }
    static output(gpio, options = {}) {
        return new Pin_1.Pin(gpio, Pin_1.Direction.Output, options);
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
