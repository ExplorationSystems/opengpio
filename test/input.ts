import { NanoPi_NEO3, Edge, Bias } from '../src';
const input = NanoPi_NEO3.input(NanoPi_NEO3.bcm.GPIO3_B0, {
    debounce: 20, // TODO probably not nessesary for input, only watch.
    bias: Bias.PullUp
});

setTimeout(() => {
    console.log('Input', input.value);
}, 5000);
