"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
const types_1 = require("../types");
const lib_1 = __importDefault(require("../lib"));
const events_1 = require("events");
class Watch extends events_1.EventEmitter {
    constructor(gpio, edge) {
        super();
        this.edge = edge;
        this.getter = () => false;
        this.cleanup = () => { };
        this.stopped = false;
        const [getter, cleanup] = lib_1.default.watch(gpio.chip, gpio.line, (value) => {
            if (value && (edge === types_1.Edge.Rising || edge === types_1.Edge.Both)) {
                console.log('Rising Event', value);
                // Has risen to true
                this.emit('event', value);
                this.emit('change', value);
                this.emit('rise', value);
            }
            else if (!value && (edge === types_1.Edge.Falling || edge === types_1.Edge.Both)) {
                console.log('Falling Event', value);
                // Has fallen to false
                this.emit('event', value);
                this.emit('change', value);
                this.emit('fall', value);
            }
        });
        this.cleanup = cleanup;
    }
    get value() {
        return this.getter();
    }
    stop() {
        this.stopped = true;
        this.removeAllListeners();
        this.cleanup();
    }
}
exports.Watch = Watch;
