import { Device } from '../classes/Device';

export class NanoPi_NEO3 extends Device {
    static board = {
        27: { chip: 0, line: 27 },
        66: { chip: 2, line: 2 },
        79: { chip: 2, line: 15 },
        81: { chip: 2, line: 17 },
        82: { chip: 2, line: 18 },
        83: { chip: 2, line: 19 },
        87: { chip: 2, line: 23 },
        96: { chip: 3, line: 0 },
        97: { chip: 3, line: 1 },
        98: { chip: 3, line: 2 },
        100: { chip: 3, line: 4 },
        101: { chip: 3, line: 5 },
        102: { chip: 3, line: 6 },
        103: { chip: 3, line: 7 },
        104: { chip: 3, line: 8 }
    };

    static bcm = {
        GPIO0_D3: this.board[27],
        GPIO2_A2: this.board[66],
        GPIO2_B7: this.board[79],
        GPIO2_C1: this.board[81],
        GPIO2_C2: this.board[82],
        GPIO2_C3: this.board[83],
        GPIO2_C7: this.board[87],
        GPIO3_A0: this.board[96],
        GPIO3_A1: this.board[97],
        GPIO3_A2: this.board[98],
        GPIO3_A4: this.board[100],
        GPIO3_A5: this.board[101],
        GPIO3_A6: this.board[102],
        GPIO3_A7: this.board[103],
        GPIO3_B0: this.board[104]
    };
}