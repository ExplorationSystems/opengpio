// This is an worker process for the lib, allowing node to execute long running syncronous tasks in a separate thread
import lib from './lib';
import { Edge } from './types';

if (!process.send) throw new Error('Worker must be run as a child process');

process.on('message', ([method, args]) => {
    if (method === 'watch') {
        const [chip, line, edge] = args as [number, number, Edge];

        lib.watch(chip, line, edge, (value: boolean) => process.send!(value));
    } else if (method === 'pwm') {
        const [chip, line, dutyCycle, frequency] = args as [
            number,
            number,
            number,
            number
        ];

        lib.pwm(chip, line, dutyCycle, frequency);
    } else {
        throw new Error(`Unknown method ${method}`);
    }
});
