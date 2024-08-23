import { Device } from '../classes/Device';

export class RaspberryPi_4B extends Device {
    //as of 
    //- https://datasheets.raspberrypi.com/rpi4/raspberry-pi-4-reduced-schematics.pdf
    //- https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
    //- https://pinout.xyz/ (in [] brackets if different)
    //- and the output of gpioinfo (in brackets () if different)
    static board = {
        3: { chip: 0, line: 2 }, //GPIO2
        5: { chip: 0, line: 3 }, //GPIO3
        7: { chip: 0, line: 4 }, //GPIO4
        8: { chip: 0, line: 14 }, //GPIO14
        10: { chip: 0, line: 15 }, //GPIO15
        11: { chip: 0, line: 17 }, //GPIO17
        12: { chip: 0, line: 18 }, //GPIO18
        13: { chip: 0, line: 27 }, //GPIO27
        15: { chip: 0, line: 22 }, //GPIO22
        16: { chip: 0, line: 23 }, //GPIO23
        18: { chip: 0, line: 24 }, //GPIO24
        19: { chip: 0, line: 10 }, //GPIO10
        21: { chip: 0, line: 9 }, //GPIO9
        22: { chip: 0, line: 25 }, //GPIO25
        23: { chip: 0, line: 11 }, //GPIO11
        24: { chip: 0, line: 8 }, //GPIO8
        26: { chip: 0, line: 7 }, //GPIO7
        27: { chip: 0, line: 0 }, //GPIO0 and ID_SD (ID_SDA) [EEPROM SDA]
        28: { chip: 0, line: 1 }, //GPIO1 and ID_SC (ID_SCL) [EEPROM SCL]
        29: { chip: 0, line: 5 }, //GPIO5
        31: { chip: 0, line: 6 }, //GPIO6
        32: { chip: 0, line: 12 }, //GPIO12
        33: { chip: 0, line: 13 }, //GPIO13
        35: { chip: 0, line: 19 }, //GPIO19
        36: { chip: 0, line: 16 }, //GPIO16
        37: { chip: 0, line: 26 }, //GPIO26
        38: { chip: 0, line: 20 }, //GPIO20
        40: { chip: 0, line: 21 } //GPIO21
    };

    static bcm = {
        GPIO0: this.board[27], //GPIO0 and ID_SD (ID_SDA) [EEPROM SDA]
        ID_SD: this.board[27],
        ID_SDA: this.board[27],
        EEPROM_SDA: this.board[27],
        GPIO1: this.board[28], //GPIO1 and ID_SC (ID_SCL) [EEPROM SCL]
        ID_SC: this.board[28],
        ID_SCL: this.board[28],
        EEPROM_SCL: this.board[28],
        GPIO2: this.board[3],
        GPIO3: this.board[5],
        GPIO4: this.board[7],
        GPIO5: this.board[29],
        GPIO6: this.board[31],
        GPIO7: this.board[26],
        GPIO8: this.board[24],
        GPIO9: this.board[21],
        GPIO10: this.board[19],
        GPIO11: this.board[23],
        GPIO12: this.board[32],
        GPIO13: this.board[33],
        GPIO14: this.board[8],
        GPIO15: this.board[10],
        GPIO16: this.board[36],
        GPIO17: this.board[11],
        GPIO18: this.board[12],
        GPIO19: this.board[35],
        GPIO20: this.board[38],
        GPIO21: this.board[40],
        GPIO22: this.board[15],
        GPIO23: this.board[16],
        GPIO24: this.board[18],
        GPIO25: this.board[22],
        GPIO26: this.board[37],
        GPIO27: this.board[13]
    };
}