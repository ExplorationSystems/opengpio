import { Edge, Gpio } from './types';
import { fork } from 'child_process';
import path from 'path';
import debug from 'debug';
import lib from './lib';

const log = debug('opengpio');
// const primaryWorker = fork(path.join(__dirname, 'worker'));

// Make get and set calls async to not block the main thread
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
        frequency = Math.round(Math.max(frequency, 1)); // Clamp frequency to 1+

        log(`pwm(${gpio.chip}, ${gpio.line}, ${dutyCycle}, ${frequency})`);
        const worker = fork(path.join(__dirname, 'worker'));

        worker.send(['pwm', [gpio.chip, gpio.line, dutyCycle, frequency]]);
        return worker;
    }
};

export default opengpio;
