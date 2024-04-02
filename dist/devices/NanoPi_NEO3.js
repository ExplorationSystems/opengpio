"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = require("../classes/Device");
class NanoPi_NEO3 extends Device_1.Device {
}
_a = NanoPi_NEO3;
NanoPi_NEO3.board = {
    27: { chip: 0, line: 27 },
    66: { chip: 2, line: 2 },
    79: { chip: 2, line: 15 },
    81: { chip: 2, line: 17 },
    82: { chip: 2, line: 18 },
    83: { chip: 2, line: 19 },
    87: { chip: 2, line: 23 },
    96: { chip: 3, line: 0 },
    97: { chip: 3, line: 1 },
    98: { chip: 3, line: 2 },
    100: { chip: 3, line: 4 },
    101: { chip: 3, line: 5 },
    102: { chip: 3, line: 6 },
    103: { chip: 3, line: 7 },
    104: { chip: 3, line: 8 }
};
NanoPi_NEO3.bcm = {
    GPIO0_D3: _a.board[27],
    GPIO2_A2: _a.board[66],
    GPIO2_B7: _a.board[79],
    GPIO2_C1: _a.board[81],
    GPIO2_C2: _a.board[82],
    GPIO2_C3: _a.board[83],
    GPIO2_C7: _a.board[87],
    GPIO3_A0: _a.board[96],
    GPIO3_A1: _a.board[97],
    GPIO3_A2: _a.board[98],
    GPIO3_A4: _a.board[100],
    GPIO3_A5: _a.board[101],
    GPIO3_A6: _a.board[102],
    GPIO3_A7: _a.board[103],
    GPIO3_B0: _a.board[104]
};
exports.default = NanoPi_NEO3;
