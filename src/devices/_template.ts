import { Gpio } from '../types';
import { Device } from '../class/Device';

const boardGpio: Record<number, Gpio> = {
    0: { chip: 0, line: 0 }
};

export default class TemplateDevice extends Device {
    static board = boardGpio;
    static bcm = {
        GPIO0_0: boardGpio[27]
    };
}
