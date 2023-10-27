import binding from 'bindings';
import { Edge, Gpio, type OpenGpioBindings } from './types';
import { ChildProcess, fork } from 'child_process';
import path from 'path';
import debug from 'debug';
const log = debug('opengpio');

const lib: OpenGpioBindings = binding('opengpio');

const opengpio = {
    get: (gpio: Gpio) => {
        log(`get(${gpio.chip}, ${gpio.line})`);
        return lib.get(gpio.chip, gpio.line);
    },
    set: (gpio: Gpio, value: boolean) => {
        log(`set(${gpio.chip}, ${gpio.line}, ${value})`);
        lib.set(gpio.chip, gpio.line, value);
    },
    watch: (gpio: Gpio, edge: Edge, callback: (value: boolean) => void) => {
        log(`watch(${gpio.chip}, ${gpio.line}, ${edge})`);
        const worker = fork(path.join(__dirname, 'worker'));

        worker.send(['watch', [gpio.chip, gpio.line, edge]]);
        worker.on('message', callback);
        return worker;
    },
    pwm: (gpio: Gpio, dutyCycle: number, frequency: number = 50) => {
        dutyCycle = Math.min(Math.max(dutyCycle, 0), 1); // Clamp duty cycle to 0-1
        frequency = Math.max(frequency, 1); // Clamp frequency to 1+

        log(`pwm(${gpio.chip}, ${gpio.line}, ${dutyCycle}, ${frequency})`);
        const worker = fork(path.join(__dirname, 'worker'));

        worker.send(['pwm', [gpio.chip, gpio.line, dutyCycle, frequency]]);
        return worker;
    }
};

export default opengpio;
