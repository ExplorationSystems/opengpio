import { NanoPi_NEO3, Bias } from '../src';
const input = NanoPi_NEO3.input(NanoPi_NEO3.bcm.GPIO2_B7, {
    bias: Bias.PullUp
});

console.log("Input", input)

setInterval(() => {
    console.log('Value', input.value);
}, 1000);

process.on('beforeExit', () => {
    console.log('Close')
    input.stop();
})