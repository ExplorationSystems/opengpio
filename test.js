const { Gpio, devices, Edge } = require('./dist');


console.log('Watch pin 66');
const pin66 = new Gpio(devices.NanoPi_NEO3, 66);
pin66.pwm(0.5);
// pin66.set(false)
console.log('After watch pin 66')

// console.log('Watch pin 66');
// const pin66 = new Gpio(devices.NanoPi_NEO3, 66);
// pin66.watch((value) => console.log('interrupt', value), Edge.Rising);
// console.log('After watch pin 66')