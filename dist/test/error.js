"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
console.log('Watch error test');
const pin = src_1.NanoPi_NEO3.output(src_1.NanoPi_NEO3.bcm.GPIO0_D3);
setTimeout(() => {
    console.log('Watching the same pin again');
    const pin = src_1.NanoPi_NEO3.output(src_1.NanoPi_NEO3.bcm.GPIO0_D3);
}, 2000);
