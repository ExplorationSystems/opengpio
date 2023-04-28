"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I2c = void 0;
const i2c = require('i2c-bus');
class I2c {
    constructor(bus, address) {
        this.bus = bus;
        this.address = address;
    }
    open() {
        i2c.openPromisified(this.bus);
    }
}
exports.I2c = I2c;
