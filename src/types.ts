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

export type DutyCycleSetter = (dutyCycle: number) => void;
export type FrequencySetter = (frequency: number) => void;
export type CleanupCallback = () => void;
export type PinSetter = (value: boolean) => void;
export type PinGetter = () => boolean;
export type WatchCallback = (value:boolean) => void;

export type OpenGpioBindings = {
    info: () => string;
    input: (chip: number, line: number) => [PinGetter, CleanupCallback];
    output: (chip: number, line: number) => [PinSetter, CleanupCallback];
    watch: (
        chip: number,
        line: number,
        callback: WatchCallback,
    ) => [CleanupCallback];
    pwm: (
        chip: number,
        line: number,
        dutyCycle: number,
        frequency: number
    ) => [DutyCycleSetter, FrequencySetter, CleanupCallback];
};