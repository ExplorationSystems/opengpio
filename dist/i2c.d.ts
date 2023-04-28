export declare class I2c {
    private bus;
    private address;
    constructor(bus: number, address: number);
    open(): void;
}
