"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src/");
const watch = src_1.NanoPi_NEO3.watch(src_1.NanoPi_NEO3.bcm.GPIO0_D3, src_1.Edge.Rising);
watch.on('change', (value) => {
    console.log(`Edge detected: ${value}`);
});
setInterval(() => {
    console.log('Value', watch.value);
}, 1000);
