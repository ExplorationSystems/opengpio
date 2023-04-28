"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoPi_NEO3 = void 0;
var Group;
(function (Group) {
    Group[Group["A"] = 0] = "A";
    Group[Group["B"] = 1] = "B";
    Group[Group["C"] = 2] = "C";
    Group[Group["D"] = 3] = "D";
})(Group || (Group = {}));
function getGpio(gpioRef) {
    const [bank, set] = gpioRef.split('_');
    const setKey = set[0];
    return {
        line: 8 * Group[setKey] + parseInt(set[1]),
        chip: parseInt(bank.replace('GPIO', ''))
    };
}
exports.NanoPi_NEO3 = {
    gpio: {
        27: getGpio('GPIO0_D3'),
        66: getGpio('GPIO2_A2'),
        79: getGpio('GPIO2_B7'),
        81: getGpio('GPIO2_C1'),
        82: getGpio('GPIO2_C2'),
        83: getGpio('GPIO2_C3'),
        87: getGpio('GPIO2_C7'),
        96: getGpio('GPIO3_A0'),
        97: getGpio('GPIO3_A1'),
        98: getGpio('GPIO3_A2'),
        100: getGpio('GPIO3_A4'),
        101: getGpio('GPIO3_A5'),
        102: getGpio('GPIO3_A6'),
        103: getGpio('GPIO3_A7'),
        104: getGpio('GPIO3_B0')
    }
};
