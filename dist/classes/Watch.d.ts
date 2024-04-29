/// <reference types="node" />
import { Gpio, Edge, GpioInputOptions } from '../types';
import { EventEmitter } from 'events';
export declare class Watch extends EventEmitter {
    private edge;
    private getter;
    private cleanup;
    private stopped;
    constructor(gpio: Gpio, edge: Edge, options?: GpioInputOptions);
    get value(): boolean;
    stop(): void;
}
