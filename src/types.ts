export enum Edge {
    Rising = 1,
    Falling = -1,
    Both = 0
}

export type Gpio = {
    chip: number;
    line: number;
};

export enum Bias {
    // AsIs = 1,
    // Unknown = 2,
    Disabled = 3,
    PullUp = 4,
    PullDown = 5
}

// The type of the object returned by the native module.
export type DutyCycleSetter = (dutyCycle: number) => void;
export type FrequencySetter = (frequency: number) => void;
export type CleanupCallback = () => void;
export type PinSetter = (value: boolean) => void;
export type PinGetter = () => boolean;
export type WatchCallback = (value: boolean) => void;

export type OpenGpioBindings = {
    info: () => string;
    input: (chip: number, line: number, bias: number) => [PinGetter, CleanupCallback];
    output: (chip: number, line: number) => [PinSetter, CleanupCallback];
    watch: (
        chip: number,
        line: number,
        bias: number,
        debounce: number,
        callback: WatchCallback,
    ) => [PinGetter, CleanupCallback];
    pwm: (
        chip: number,
        line: number,
        dutyCycle: number,
        frequency: number
    ) => [DutyCycleSetter, FrequencySetter, CleanupCallback];
};

export type GpioInputOptions = {
    debounce?: number;
    bias?: Bias;
}

export type GpioOutputOptions = {}