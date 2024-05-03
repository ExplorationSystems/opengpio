"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocked = exports.bindings = void 0;
const bindings_1 = __importDefault(require("bindings"));
let bindings = {};
exports.bindings = bindings;
const mocked = process.env.OPENGPIO_MOCKED === 'true';
exports.mocked = mocked;
if (!mocked) {
    exports.bindings = bindings = (0, bindings_1.default)('opengpio');
}
if (mocked) {
    bindings.info = (() => { });
    bindings.input = (() => { });
    bindings.output = (() => { });
    bindings.pwm = (() => { });
    bindings.watch = (() => { });
}
