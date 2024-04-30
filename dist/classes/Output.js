"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const lib_1 = __importDefault(require("../lib"));
class Output {
    constructor(gpio, options = {}) {
        this.setter = () => { };
        this.cleanup = () => { };
        // Currently options is not used by lib.output but is added for future parameters.
        const [setter, cleanup] = lib_1.default.output(gpio.chip, gpio.line);
        this.setter = setter;
        this.cleanup = cleanup;
    }
    stop() {
        this.cleanup();
    }
    set value(value) {
        this.setter(value);
    }
}
exports.Output = Output;
