import { Gpio } from '../types';
import { Device } from '../class/Device';

export default class TemplateDevice extends Device {
    static board = {
        0: { chip: 0, line: 0 }
    };
    static bcm = {
        GPIO0_0: this.board[0]
    };
}
