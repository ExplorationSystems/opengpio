import { Device } from '../classes/Device';

export default class Radxa_Rock_S0 extends Device {
    static board = {
        3: { chip: 0, line: 11 },
        5: { chip: 0, line: 12 },
        27: { chip: 0, line: 15 },
        28: { chip: 0, line: 16 },
        15: { chip: 0, line: 17 },
        33: { chip: 0, line: 18 },

        21: { chip: 1, line: 22 },
        19: { chip: 1, line: 23 },
        23: { chip: 1, line: 24 },
        24: { chip: 1, line: 25 },

        8: { chip: 2, line: 1 },
        37: { chip: 2, line: 2 },
        13: { chip: 2, line: 3 },
        35: { chip: 2, line: 4 },
        38: { chip: 2, line: 5 },
        36: { chip: 2, line: 6 },
        40: { chip: 2, line: 7 },
        26: { chip: 2, line: 8 },
        12: { chip: 2, line: 9 },
        31: { chip: 2, line: 10 },
        22: { chip: 2, line: 11 },
        32: { chip: 2, line: 12 },
        7: { chip: 2, line: 13 },
        11: { chip: 2, line: 14 },
        18: { chip: 2, line: 15 },
        29: { chip: 2, line: 16 },

    };

    static bcm = {
        PIN_3: this.board[3],
        PIN_5: this.board[5],
        PIN_27: this.board[27],
        PIN_28: this.board[28],
        PIN_15: this.board[15],
        PIN_33: this.board[33],
        PIN_21: this.board[21],
        PIN_19: this.board[19],
        PIN_23: this.board[23],
        PIN_24: this.board[24],
        PIN_8: this.board[8],
        PIN_37: this.board[37],
        PIN_13: this.board[13],
        PIN_35: this.board[35],
        PIN_38: this.board[38],
        PIN_36: this.board[36],
        PIN_40: this.board[40],
        PIN_26: this.board[26],
        PIN_12: this.board[12],
        PIN_31: this.board[31],
        PIN_22: this.board[22],
        PIN_32: this.board[32],
        PIN_7: this.board[7],
        PIN_11: this.board[11],
        PIN_18: this.board[18],
        PIN_29: this.board[29],
    };
}
