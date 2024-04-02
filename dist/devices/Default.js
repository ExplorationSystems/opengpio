"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Default extends classes_1.Device {
}
_a = Default;
Default.board = {
    0: { chip: 0, line: 0 }
};
Default.bcm = {
    GPIO0_0: _a.board[0]
};
exports.default = Default;
