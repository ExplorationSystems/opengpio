import binding from 'bindings';
import { Gpio, type OpenGpioBindings } from './types';
const lib: OpenGpioBindings = binding('opengpio');

export function get(gpio: Gpio): number {
  return lib.get(gpio.chip, gpio.line);
}

export function set(gpio: Gpio, value: boolean): void {
  lib.set(gpio.chip, gpio.line, value);
}
