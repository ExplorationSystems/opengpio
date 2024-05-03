"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const bindings_1 = require("../bindings");
class Output {
    constructor(gpio, options = {}) {
        this.setter = () => { };
        this.cleanup = () => { };
        // Currently options is not used by lib.output but is added for future parameters.
        const [setter, cleanup] = bindings_1.bindings.output(gpio.chip, gpio.line);
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
