export enum Edge {
  Rising = 1,
  Falling = -1,
  Both = 0
}

export type OpenGpio = {
  info: () => string;
  get: (pin: number) => number;
  set: (pin: number, value: number) => void;
  watch: (pin: number, edge: Edge, callback: (value: number) => void) => void;
  pwm: (pin: number, value: number) => void;
};

export type Raster = {
  line: number;
  chip: number;
};

export type Device = {
  gpio: Record<number, Raster>;
};
