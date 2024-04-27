import { NanoPi_NEO3, Edge } from '../src/';

const watch = NanoPi_NEO3.watch(NanoPi_NEO3.bcm.GPIO2_B7, Edge.Both, {
    debounce: 20
});
watch.on('change', (value) => {
    console.log(`Edge detected: ${value}`);
});

setInterval(() => {
    console.log('Value', watch.value);
}, 1000);