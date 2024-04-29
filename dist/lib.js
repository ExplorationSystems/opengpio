"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
process.env.LD_LIBRARY_PATH = path_1.default.join(__dirname, '../libgpiod/bindings/cxx/.libs') + (process.env.LD_LIBRARY_PATH ? ':' + process.env.LD_LIBRARY_PATH : '');
console.log(process.env.LD_LIBRARY_PATH);
const bindings_1 = __importDefault(require("bindings"));
const bindings = (0, bindings_1.default)('opengpio');
exports.default = bindings;
