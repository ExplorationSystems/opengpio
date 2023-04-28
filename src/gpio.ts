import lib from './lib'
import { ChildProcess, fork } from 'child_process'

export enum Edge {
    Rising = 0,
    Falling = 1,
    Both = 2
}

export class Gpio {
    constructor(private device: Device, private pin: keyof Device['gpio']) { }
    private get raster(): Raster {
        return this.device.gpio[this.pin]
    }

    get(): boolean {
        return lib.get(this.raster.chip, this.raster.line)
    }
    set(value: boolean): void {
        lib.set(this.raster.chip, this.raster.line, value)
    }

    pwm(dutyCycle: number, frequency: number = 50): ChildProcess {
        const child = fork(`${__dirname}/runner.js`);
        child.send(['pwm', this.raster.chip, this.raster.line, dutyCycle, frequency]);
        return child;
    }
    
    pwmSync(dutyCycle: number, frequency: number = 50): void {
        lib.pwm(this.raster.chip, this.raster.line, dutyCycle, frequency)
    }

    watch(callback: (value: boolean) => void, edge: Edge = Edge.Both): ChildProcess {
        const child = fork(`${__dirname}/runner.js`);
        child.send(['watch', this.raster.chip, this.raster.line, edge]);
        child.on('message', callback);
        return child;
    }

    watchSync(callback: (value: boolean) => void, edge: Edge = Edge.Both): void {
        lib.watch(this.raster.chip, this.raster.line, edge, callback);
    }
}