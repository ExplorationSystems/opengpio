import i2c from 'i2c-bus';

export class I2c {
    private bus!: Promise<i2c.PromisifiedBus>
    constructor(private busNumber: number, private address: number) {
        this.bus = i2c.openPromisified(this.busNumber)
    }

    async write(data: Buffer): Promise<Buffer> {
        const bus = await this.bus;
        const { buffer } = await bus.i2cWrite(this.address, data.length, data);
        return buffer;
    }

    async read(data: Buffer): Promise<Buffer> {
        const bus = await this.bus;
        const { buffer } = await bus.i2cRead(this.address, data.length, data);
        return buffer;
    }
}