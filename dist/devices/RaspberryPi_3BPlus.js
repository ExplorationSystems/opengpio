"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = require("../classes/Device");
class RaspberryPi_3BPlus extends Device_1.Device {
}
_a = RaspberryPi_3BPlus;
//as of 
//- https://datasheets.raspberrypi.com/rpi3/raspberry-pi-3-b-plus-reduced-schematics.pdf
//- https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
//- https://pinout.xyz/ (in [] brackets if different)
//- and the output of gpioinfo (in brackets () if different)
RaspberryPi_3BPlus.board = {
    3: { chip: 0, line: 2 }, //GPIO2 and SDA (SDA1) [I2C1 SDA]
    5: { chip: 0, line: 3 }, //GPIO3 and SCL (SCL1) [I2C1 SCL]
    7: { chip: 0, line: 4 }, //GPIO4 and GPCLK0 (GPIO_GCLK) [GPCLK0]
    8: { chip: 0, line: 14 }, //GPIO14 and TXD1 [UART TX]
    10: { chip: 0, line: 15 }, //GPIO15 and RXD1 [UART RX]
    11: { chip: 0, line: 17 }, //GPIO17
    12: { chip: 0, line: 18 }, //GPIO18 and PCM_CLK [PCM CLK]
    13: { chip: 0, line: 27 }, //GPIO27
    15: { chip: 0, line: 22 }, //GPIO22
    16: { chip: 0, line: 23 }, //GPIO23
    18: { chip: 0, line: 24 }, //GPIO24
    19: { chip: 0, line: 10 }, //GPIO10 and MOSI (SPI_MOSI) [SPI0 MOSI]
    21: { chip: 0, line: 9 }, //GPIO9 and MISO (SPI_MISO) [SPI0 MISO]
    22: { chip: 0, line: 25 }, //GPIO25
    23: { chip: 0, line: 11 }, //GPIO11 and SCLK (SPI_SCLK) [SPI0 SCLK]
    24: { chip: 0, line: 8 }, //GPIO8 and CEO (SPI_CE0_N) [SPI0 CE0]
    26: { chip: 0, line: 7 }, //GPIO7 and CE1 (SPI_CE1_N) [SPI0 CE1]
    27: { chip: 0, line: 0 }, //GPIO0 and ID_SD (ID_SDA) [EEPROM SDA]
    28: { chip: 0, line: 1 }, //GPIO1 and ID_SC (ID_SCL) [EEPROM SCL]
    29: { chip: 0, line: 5 }, //GPIO5
    31: { chip: 0, line: 6 }, //GPIO6
    32: { chip: 0, line: 12 }, //GPIO12 and [PWM0]
    33: { chip: 0, line: 13 }, //GPIO13 and [PWM1]
    35: { chip: 0, line: 19 }, //GPIO19 and PCM_FS [PCM FS]
    36: { chip: 0, line: 16 }, //GPIO16
    37: { chip: 0, line: 26 }, //GPIO26
    38: { chip: 0, line: 20 }, //GPIO20 and PCM_DIN [PCM DIN]
    40: { chip: 0, line: 21 } //GPIO21 and PCM_DOUT [PCM DOUT]
};
RaspberryPi_3BPlus.bcm = {
    GPIO0: _a.board[27], //GPIO0 and ID_SD (ID_SDA) [EEPROM SDA]
    ID_SD: _a.board[27],
    ID_SDA: _a.board[27],
    EEPROM_SDA: _a.board[27],
    GPIO1: _a.board[28], //GPIO1 and ID_SC (ID_SCL) [EEPROM SCL]
    ID_SC: _a.board[28],
    ID_SCL: _a.board[28],
    EEPROM_SCL: _a.board[28],
    GPIO2: _a.board[3], //GPIO2 and SDA (SDA1) [I2C1 SDA]
    SDA: _a.board[3],
    SDA1: _a.board[3],
    I2C1_SDA: _a.board[3],
    GPIO3: _a.board[5], //GPIO3 and SCL (SCL1) [I2C1 SCL]
    SCL: _a.board[5],
    SCL1: _a.board[5],
    I2C1_SCL: _a.board[5],
    GPIO4: _a.board[7], //GPIO4 (GPIO_GCLK) [GPCLK0]
    GPIO_GCLK: _a.board[7],
    GPCLK0: _a.board[7],
    GPIO5: _a.board[29],
    GPIO6: _a.board[31],
    GPIO7: _a.board[26], //GPIO7 and CE1 (SPI_CE1_N) [SPI0 CE1]
    CE1: _a.board[26],
    SPI_CE1_N: _a.board[26],
    SPI0_CE1: _a.board[26],
    GPIO8: _a.board[24], //GPIO8 and CEO (SPI_CE0_N) [SPI0 CE0]
    CE0: _a.board[24],
    SPI_CE0_N: _a.board[24],
    SPI0_CE0: _a.board[24],
    GPIO9: _a.board[21], //GPIO9 and MISO (SPI_MISO) [SPI0 MISO]
    MISO: _a.board[21],
    SPI_MISO: _a.board[21],
    SPI0_MISO: _a.board[21],
    GPIO10: _a.board[19], //GPIO10 and MOSI (SPI_MOSI) [SPI0 MOSI]
    MOSI: _a.board[19],
    SPI_MOSI: _a.board[19],
    SPI0_MOSI: _a.board[19],
    GPIO11: _a.board[23], //GPIO11 and SCLK (SPI_SCLK) [SPI0 SCLK]
    SCLK: _a.board[23],
    SPI_SCLK: _a.board[23],
    SPI0_SCLK: _a.board[23],
    GPIO12: _a.board[32], //GPIO12 and [PWM0]
    PWM0: _a.board[32],
    GPIO13: _a.board[33], //GPIO13 and [PWM1]
    PWM1: _a.board[33],
    GPIO14: _a.board[8], //GPIO14 and TXD1 [UART TX]
    TXD1: _a.board[8],
    UART_TX: _a.board[8],
    GPIO15: _a.board[10], //GPIO15 and RXD1 [UART RX]
    RXD1: _a.board[10],
    UART_RX: _a.board[10],
    GPIO16: _a.board[36],
    GPIO17: _a.board[11],
    GPIO18: _a.board[12], //GPIO18 and PCM_CLK [PCM CLK]
    PCM_CLK: _a.board[12],
    GPIO19: _a.board[35], //GPIO19 and PCM_FS [PCM FS]
    PCM_FS: _a.board[35],
    GPIO20: _a.board[38], //GPIO20 and PCM_DIN [PCM DIN]
    PCM_DIN: _a.board[38],
    GPIO21: _a.board[40], //GPIO21 and PCM_DOUT [PCM DOUT]
    PCM_DOUT: _a.board[40],
    GPIO22: _a.board[15],
    GPIO23: _a.board[16],
    GPIO24: _a.board[18],
    GPIO25: _a.board[22],
    GPIO26: _a.board[37],
    GPIO27: _a.board[13]
};
exports.default = RaspberryPi_3BPlus;
