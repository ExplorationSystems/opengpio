"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const lib_1 = __importDefault(require("../lib"));
class Input {
    constructor(gpio, options = {}) {
        var _a;
        this.getter = () => false;
        this.cleanup = () => { };
        const [getter, cleanup] = lib_1.default.input(gpio.chip, gpio.line, (_a = options.bias) !== null && _a !== void 0 ? _a : 0);
        this.getter = getter;
        this.cleanup = cleanup;
    }
    stop() {
        this.cleanup();
    }
    get value() {
        return this.getter();
    }
}
exports.Input = Input;
