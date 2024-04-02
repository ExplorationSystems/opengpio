"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const Pwm_1 = require("./Pwm");
const Pin_1 = require("./Pin");
const Watch_1 = require("./Watch");
class Device {
    static input(gpio) {
        return new Pin_1.Pin(gpio, Pin_1.Direction.Input);
    }
    static output(gpio) {
        return new Pin_1.Pin(gpio, Pin_1.Direction.Output);
    }
    static watch(gpio, edge) {
        return new Watch_1.Watch(gpio, edge);
    }
    static pwm(gpio, dutyCycle, frequency) {
        return new Pwm_1.Pwm(gpio, dutyCycle, frequency);
    }
}
exports.Device = Device;
Device.board = {};
Device.bcm = {};
