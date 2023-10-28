import { Gpio } from '../types';
import { Device } from '../class/Device';

const pinToGpio: Record<number, Gpio> = {
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

export default class NanoPi_NEO3 extends Device {
    static board = pinToGpio;
    static bcm = {
        GPIO0_D3: pinToGpio[27],
        GPIO2_A2: pinToGpio[66],
        GPIO2_B7: pinToGpio[79],
        GPIO2_C1: pinToGpio[81],
        GPIO2_C2: pinToGpio[82],
        GPIO2_C3: pinToGpio[83],
        GPIO2_C7: pinToGpio[87],
        GPIO3_A0: pinToGpio[96],
        GPIO3_A1: pinToGpio[97],
        GPIO3_A2: pinToGpio[98],
        GPIO3_A4: pinToGpio[100],
        GPIO3_A5: pinToGpio[101],
        GPIO3_A6: pinToGpio[102],
        GPIO3_A7: pinToGpio[103],
        GPIO3_B0: pinToGpio[104]
    };
}
