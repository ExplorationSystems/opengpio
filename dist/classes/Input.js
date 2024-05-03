"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const bindings_1 = require("../bindings");
class Input {
    constructor(gpio, options = {}) {
        var _a;
        this.getter = () => false;
        this.cleanup = () => { };
        const [getter, cleanup] = bindings_1.bindings.input(gpio.chip, gpio.line, (_a = options.bias) !== null && _a !== void 0 ? _a : 0);
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
