"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bindings_1 = __importDefault(require("bindings"));
const opengpio = (0, bindings_1.default)('opengpio');
exports.default = opengpio;
