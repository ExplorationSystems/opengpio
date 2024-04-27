import { NanoPi_NEO3, Bias } from '../src';
const output = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO2_A2);

console.log("Output", output)

let value = false;
setInterval(() => {
    value = !value;
    console.log(`Setting value to ${value}.`);
    output.value = value;
}, 1000);
