import { bindings } from '../bindings';

import { CleanupCallback, Gpio, PinSetter, GpioOutputOptions } from '../types';

export class Output {
    private setter: PinSetter = () => { };
    private cleanup: CleanupCallback = () => { };

    constructor(gpio: Gpio, options: GpioOutputOptions = {}) {
        // Currently options is not used by lib.output but is added for future parameters.
        const [setter, cleanup] = bindings.output(gpio.chip, gpio.line)
        this.setter = setter;
        this.cleanup = cleanup;
    }

    stop() {
        this.cleanup();
    }

    set value(value: boolean) {
        this.setter(value);
    }
}
