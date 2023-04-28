"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is an async runner for the lib, allowing node to execute long running tasks in a separate thread
const lib_1 = __importDefault(require("./lib"));
process.on('message', ([method, ...args]) => {
    if (method === 'watch') {
        const [chip, line, edge] = args;
        lib_1.default.watch(chip, line, edge, (value) => {
            if (process.send)
                process.send(value);
            else {
                throw new Error('process.send is undefined');
            }
        });
    }
    else if (method === 'pwm') {
        const [chip, line, dutyCycle, frequency] = args;
        lib_1.default.pwm(chip, line, dutyCycle, frequency);
    }
    else {
        throw new Error(`Unknown method ${method}`);
    }
});
