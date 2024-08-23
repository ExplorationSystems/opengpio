import { Device } from '../classes/Device';

// Schematics: https://drive.google.com/drive/folders/1eG4tuJnv7Jd4BzQTmjXZhBjIs2sG2z4L
export class OrangePi_5 extends Device {
    static board = {
        3: { chip: 1, line: 27 }, //GPIO2 GPIO1_D3
        5: { chip: 1, line: 26 }, //GPIO3 GPIO1_D2
        7: { chip: 1, line: 25 }, //GPIO4 GPIO1_D1
        11: { chip: 1, line: 25 }, //GPIO17 GPIO1_D0
        12: { chip: 1, line: 29 }, //GPIO18 GPIO1_D5
        13: { chip: 1, line: 22 }, //GPIO27 GPIO1_C6
        15: { chip: 1, line: 20 }, //GPIO22 GPIO1_C4
        16: { chip: 0, line: 18 }, //GPIO23 GPIO0_C2
        18: { chip: 1, line: 15 }, //GPIO24 GPIO1_B7
        19: { chip: 1, line: 7 }, //GPIO10 GPIO1_A7
        21: { chip: 1, line: 6 }, //GPIO9 GPIO1_A6
        22: { chip: 1, line: 14 }, //GPIO25 GPIO1_B6
        23: { chip: 1, line: 5 }, //GPIO11 GPIO1_A5
        24: { chip: 1, line: 13 }, //GPIO8 GPIO1_B5
        26: { chip: 1, line: 12 }, //GPIO7 GPIO1_B4
        29: { chip: 1, line: 4 }, //GPIO5 GPIO1_A4
        31: { chip: 1, line: 3 }, //GPIO6 GPIO1_A3
        32: { chip: 1, line: 11 }, //GPIO12 GPIO1_B3
        33: { chip: 1, line: 2 }, //GPIO13 GPIO1_A2
        35: { chip: 1, line: 17 }, //GPIO19 GPIO1_C1
        36: { chip: 1, line: 10 }, //GPIO16 GPIO1_B2
        37: { chip: 1, line: 16 }, //GPIO26 GPIO1_C0
        38: { chip: 1, line: 9 }, //GPIO20 GPIO1_B1
        40: { chip: 1, line: 8 } //GPIO21 GPIO1_B0
    };

    static bcm = {
        GPIO2: this.board[3],
        GPIO1_D3: this.board[3],
        GPIO3: this.board[5],
        GPIO1_D2: this.board[5],
        GPIO4: this.board[7],
        GPIO1_D1: this.board[7],
        GPIO5: this.board[29],
        GPIO1_A4: this.board[29],
        GPIO6: this.board[31],
        GPIO1_A3: this.board[31],
        GPIO7: this.board[26],
        GPIO1_B4: this.board[26],
        GPIO8: this.board[24],
        GPIO1_B5: this.board[24],
        GPIO9: this.board[21],
        GPIO1_A6: this.board[21],
        GPIO10: this.board[19],
        GPIO1_A7: this.board[19],
        GPIO11: this.board[23],
        GPIO1_A5: this.board[23],
        GPIO12: this.board[32],
        GPIO1_B3: this.board[32],
        GPIO13: this.board[33],
        GPIO1_A2: this.board[33],
        // GPIO14: this.board[8], // UART TX
        // GPIO15: this.board[10], // UART RX
        GPIO16: this.board[36],
        GPIO1_B2: this.board[36],
        GPIO17: this.board[11],
        GPIO1_D0: this.board[11],
        GPIO18: this.board[12],
        GPIO1_D5: this.board[12],
        GPIO19: this.board[35],
        GPIO1_C1: this.board[35],
        GPIO20: this.board[38],
        GPIO1_B1: this.board[38],
        GPIO21: this.board[40],
        GPIO1_B0: this.board[40],
        GPIO22: this.board[15],
        GPIO1_C4: this.board[15],
        GPIO23: this.board[16],
        GPIO0_C2: this.board[16],
        GPIO24: this.board[18],
        GPIO1_B7: this.board[18],
        GPIO25: this.board[22],
        GPIO1_B6: this.board[22],
        GPIO26: this.board[37],
        GPIO1_C0: this.board[37],
        GPIO27: this.board[13],
        GPIO1_C6: this.board[13]
    };
}