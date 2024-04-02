import { Device } from '../classes';
export default class Default extends Device {
    static board: {
        0: {
            chip: number;
            line: number;
        };
    };
    static bcm: {
        GPIO0_0: {
            chip: number;
            line: number;
        };
    };
}
