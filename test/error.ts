import { NanoPi_NEO3, Edge } from '../src';

console.log('Watch error test');
const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO0_D3);

setTimeout(() => {
    console.log('Watching the same pin again');
    const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO0_D3);
}, 2000);