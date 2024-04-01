import { NanoPi_NEO3, Edge } from '../src/';

const watch = NanoPi_NEO3.watch(NanoPi_NEO3.bcm.GPIO0_D3, Edge.Rising);
watch.on('change', (value) => {
    console.log(`Edge detected: ${value}`);
});

setInterval(() => {
    console.log('Value', watch.value);
}, 1000);