"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gpio = exports.Edge = void 0;
const lib_1 = __importDefault(require("./lib"));
const child_process_1 = require("child_process");
var Edge;
(function (Edge) {
    Edge[Edge["Rising"] = 0] = "Rising";
    Edge[Edge["Falling"] = 1] = "Falling";
    Edge[Edge["Both"] = 2] = "Both";
})(Edge = exports.Edge || (exports.Edge = {}));
class Gpio {
    constructor(device, pin) {
        this.device = device;
        this.pin = pin;
    }
    get raster() {
        return this.device.gpio[this.pin];
    }
    get() {
        return lib_1.default.get(this.raster.chip, this.raster.line);
    }
    set(value) {
        lib_1.default.set(this.raster.chip, this.raster.line, value);
    }
    pwm(dutyCycle, frequency = 50) {
        const child = (0, child_process_1.fork)(`${__dirname}/runner.js`);
        child.send(['pwm', this.raster.chip, this.raster.line, dutyCycle, frequency]);
        return child;
    }
    pwmSync(dutyCycle, frequency = 50) {
        lib_1.default.pwm(this.raster.chip, this.raster.line, dutyCycle, frequency);
    }
    watch(callback, edge = Edge.Both) {
        const child = (0, child_process_1.fork)(`${__dirname}/runner.js`);
        child.send(['watch', this.raster.chip, this.raster.line, edge]);
        child.on('message', callback);
        return child;
    }
    watchSync(callback, edge = Edge.Both) {
        lib_1.default.watch(this.raster.chip, this.raster.line, edge, callback);
    }
}
exports.Gpio = Gpio;
