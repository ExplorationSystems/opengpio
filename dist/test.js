"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// const watch = NanoPi_NEO3.watch(NanoPi_NEO3.bcm.GPIO3_B0, Edge.Both);
// watch.on('event', (value) => {
//     console.log('Event', value);
// });
// setTimeout(() => {
//     watch.stop();
// }, 5000);
// setInterval(() => {
//     console.log(1);
// }, 1000);
const pwm = _1.NanoPi_NEO3.pwm(_1.NanoPi_NEO3.bcm.GPIO3_B0, 0.11, 50);
// let freq = 1;
// setInterval(() => {
//     freq += 1;
//     pwm.setFrequency(freq);
// }, 2000)
// Write a fit function that fits a number between -1 and 1 to 0.05 and 0.1
// function fit(number: number, fromMin = -1, fromMax = 1, toMin = 0.05, toMax = 0.1) {
//     // Ensure the input number is within the [-1, 1] range
//     if (number < -1) {
//         number = -1;
//     } else if (number > 1) {
//         number = 1;
//     }
//     // Map the number to the desired range
//     const fromRange = fromMax - fromMin;
//     const toRange = toMax - toMin;
//     const normalizedNumber = (number - fromMin) / fromRange;
//     const mappedNumber = normalizedNumber * toRange + toMin;
//     return mappedNumber;
// }
// setTimeout(() => {
//     pwm.setDutyCycle(0.071);
// }, 5000);
setTimeout(() => {
    let dutyCycle = 0.06;
    let direction = 1;
    setInterval(() => {
        dutyCycle += direction * 0.0001;
        if (dutyCycle >= 0.1) {
            dutyCycle = 0.1;
            direction = -1;
        }
        else if (dutyCycle <= 0.04) {
            dutyCycle = 0.04;
            direction = 1;
        }
        console.log(dutyCycle);
        pwm.setDutyCycle(dutyCycle);
    }, 50);
}, 5000);
// Go from 0 to 1 in 10 steps and back to 0 in 10 steps continuously
// const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO3_B0);
// let value = false;
// setInterval(() => {
//     pin.value = value;
//     value = !value;
// }, 1000)
// NanoPi_NEO3.set(27, false);
// const watchWorker = NanoPi_NEO3.watch(27, Edge.Rising, (value) => {});
// const pwm = NanoPi_NEO3.pwm(27, 0.1, 50);
