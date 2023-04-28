"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
class Device {
    constructor() {
        this.gpio = {};
    }
    get(pin) {
        throw new Error("Method not implemented.");
    }
    set(pin, value) {
        throw new Error("Method not implemented.");
    }
    watch(pin, edge, callback) {
        throw new Error("Method not implemented.");
    }
}
exports.Device = Device;
