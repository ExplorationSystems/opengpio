import { devices } from './main';
import { Edge } from './types';

const { NanoPi_NEO3 } = devices;

// const watch = NanoPi_NEO3.watch(NanoPi_NEO3.bcm.GPIO3_B0, Edge.Both);
// watch.on('event', (value) => {
//     console.log('Event', value);
// });

// setTimeout(() => {
//     watch.stop();
// }, 5000);

setInterval(() => {
    console.log(1);
}, 1000);

const pwm = NanoPi_NEO3.pwm(NanoPi_NEO3.bcm.GPIO3_B0, 0.5, 50);

// let freq = 1;
// setInterval(() => {
//     freq += 1;
//     pwm.setFrequency(freq);
// }, 2000)

// Go from 0 to 1 in 10 steps and back to 0 in 10 steps continuously
// let dutyCycle = 0;
// let direction = 1;
// setInterval(() => {
//     dutyCycle += direction * 0.001;
//     if (dutyCycle >= 1) {
//         dutyCycle = 1;
//         direction = -1;
//     } else if (dutyCycle <= 0) {
//         dutyCycle = 0;
//         direction = 1;
//     }

//     pwm.setDutyCycle(dutyCycle);
// }, 100);

setTimeout(() => {
    pwm.stop();
}, 5000);
// const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO3_B0);

// let value = false;
// setInterval(() => {
//     pin.value = value;
//     value = !value;
// }, 1000)
// NanoPi_NEO3.set(27, false);
// const watchWorker = NanoPi_NEO3.watch(27, Edge.Rising, (value) => {});
// const pwm = NanoPi_NEO3.pwm(27, 0.1, 50);
