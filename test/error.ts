import { NanoPi_NEO3, Edge } from '../src';

console.log('Watch error test');
const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO0_D3);

setInterval(() => {
    console.log('Watching the same pin again');
    try {
        const pin = NanoPi_NEO3.output(NanoPi_NEO3.bcm.GPIO0_D3);
    } catch (e) {
        console.log('Should catch as JS error', e);
    }
}, 2000);