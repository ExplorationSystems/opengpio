// This file just provides types for the library and is deleted from the dist folder after  
// build so that requirements will require the lib.node file instead of this one.
import { Edge } from './gpio'
type Lib = {
    get(chip: number, line: number): boolean
    set(chip: number, line: number, value: boolean): void
    pwm(chip: number, line: number, dutyCycle: number, frequency: number): void
    watch(chip: number, line: number, edge: Edge, callback: (value: boolean) => void): void
}

export default {} as Lib