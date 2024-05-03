import binding from 'bindings';
import { type OpenGpioBindings } from './types';
let bindings: OpenGpioBindings = {} as any;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    bindings = binding('opengpio');
}

if (mocked) {
    bindings.info = (() => { }) as any;
    bindings.input = (() => { }) as any;
    bindings.output = (() => { }) as any;
    bindings.pwm = (() => { }) as any;
    bindings.watch = (() => { }) as any;
}

export { bindings, mocked };
