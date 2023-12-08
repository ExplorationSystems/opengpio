import { Device } from '../classes';

export default class Default extends Device {
    static board = {
        0: { chip: 0, line: 0 }
    };
    static bcm = {
        GPIO0_0: this.board[0]
    };
}