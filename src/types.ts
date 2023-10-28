export enum Edge {
    Rising = 1,
    Falling = -1,
    Both = 0
}

export type Gpio = {
    chip: number;
    line: number;
};

// The type of the object returned by the native module.
export type OpenGpioBindings = {
    info: () => string;
    input: (chip: number, line: number) => () => boolean;
    output: (chip: number, line: number) => (value: boolean) => void;
    watch: (
        chip: number,
        line: number,
        edge: Edge,
        callback: (value: boolean) => void
    ) => void;
    pwm: (
        chip: number,
        line: number,
        dutyCycle: number,
        frequency: number
    ) => void;
};

export type Raster = {
    line: number;
    chip: number;
};

export interface Pin {
    close: () => void;
}
