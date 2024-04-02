/// <reference types="node" />
import { Gpio, Edge } from '../types';
import { EventEmitter } from 'events';
export declare class Watch extends EventEmitter {
    private edge;
    private getter;
    private cleanup;
    private stopped;
    constructor(gpio: Gpio, edge: Edge);
    get value(): boolean;
    stop(): void;
}
