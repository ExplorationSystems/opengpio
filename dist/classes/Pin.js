"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pin = exports.Direction = void 0;
const lib_1 = __importDefault(require("../lib"));
var Direction;
(function (Direction) {
    Direction[Direction["Input"] = 0] = "Input";
    Direction[Direction["Output"] = 1] = "Output";
})(Direction || (exports.Direction = Direction = {}));
class Pin {
    constructor(gpio, direction) {
        this.gpio = gpio;
        this.direction = direction;
        this.getter = () => false;
        this.setter = () => { };
        this.cleanup = () => { };
        if (direction === Direction.Input) {
            const [getter, cleanup] = lib_1.default.input(gpio.chip, gpio.line);
            this.getter = getter;
            this.cleanup = cleanup;
        }
        else if (direction === Direction.Output) {
            const [setter, cleanup] = lib_1.default.output(gpio.chip, gpio.line);
            this.setter = setter;
            this.cleanup = cleanup;
        }
    }
    stop() {
        this.cleanup();
    }
    get value() {
        return this.getter();
    }
    set value(value) {
        this.setter(value);
    }
}
exports.Pin = Pin;
