import { WatchCallback, Gpio, Edge, CleanupCallback, PinGetter } from '../types';
import lib from '../lib';
import { EventEmitter } from 'events';

export class Watch extends EventEmitter {
    private getter: PinGetter = () => false;
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;

    constructor(
        gpio: Gpio,
        private edge: Edge
    ) {
        super();
        const [getter, cleanup] = lib.watch(gpio.chip, gpio.line, (value) => {
            if (value && (edge === Edge.Rising || edge === Edge.Both)) {
                console.log('Rising Event', value);
                // Has risen to true
                this.emit('event', value);
                this.emit('change', value);
                this.emit('rise', value);
            } else if (!value && (edge === Edge.Falling || edge === Edge.Both)) {
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
