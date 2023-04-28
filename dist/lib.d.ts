import { Edge } from './gpio';
type Lib = {
    get(chip: number, line: number): boolean;
    set(chip: number, line: number, value: boolean): void;
    pwm(chip: number, line: number, dutyCycle: number, frequency: number): void;
    watch(chip: number, line: number, edge: Edge, callback: (value: boolean) => void): void;
};
declare const _default: Lib;
export default _default;
