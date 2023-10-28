import { devices } from './main';
import { Edge } from './types';

const { NanoPi_NEO3 } = devices;

// NanoPi_NEO3.get(27);
// NanoPi_NEO3.set(27, false);
// const watchWorker = NanoPi_NEO3.watch(27, Edge.Rising, (value) => {});
const pwm = NanoPi_NEO3.pwm(27, 0.1, 50);

// Go from 0 to 1 in 10 steps and back to 0 in 10 steps continuously
let dutyCycle = 0;
let direction = 1;
setInterval(() => {
    dutyCycle += direction * 0.1;
    if (dutyCycle >= 1) {
        dutyCycle = 1;
        direction = -1;
    } else if (dutyCycle <= 0) {
        dutyCycle = 0;
        direction = 1;
    }
    
    pwm.setDutyCycle(dutyCycle);
}, 1000);
