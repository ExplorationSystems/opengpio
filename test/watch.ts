import { OrangePi_5, Edge } from '../src/';

const watch = OrangePi_5.watch(OrangePi_5.bcm.GPIO19, Edge.Rising);
watch.on('change', (value) => {
    console.log(`Edge detected: ${value}`);
});

setInterval(() => {
    console.log('Value', watch.value);
}, 1000);