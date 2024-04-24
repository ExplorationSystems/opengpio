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
// TODO Make separate input / output classes with parent abstract class.
class Pin {
    constructor(gpio, direction, options = {}) {
        var _a, _b;
        this.direction = direction;
        this.getter = () => false;
        this.setter = () => { };
        this.cleanup = () => { };
        if (direction === Direction.Input) {
            // TODO Update chip to string and naming of line to offset
            const [getter, cleanup] = lib_1.default.input('gpiochip' + gpio.chip, gpio.line, (_a = options.bias) !== null && _a !== void 0 ? _a : 0, (_b = options.debounce) !== null && _b !== void 0 ? _b : 0);
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
