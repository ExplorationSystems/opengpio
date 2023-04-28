const i2c = require('i2c-bus');
const endianness = require('endianness')


const SCD30_ADDR = 0x61;
const TEMP_REG = 0x05;

i2c.openPromisified(0).then(async i2c => {
    const devices = await i2c.scan()
    console.log(devices)
    console.log(crc8(Buffer.from('0078', 'hex')))

    // Sets continuous measurement interval to 2 seconds
    // await i2c.i2cWrite(SCD30_ADDR, 5, Buffer.from('46000002' + crc8('0002'), 'hex')).then(console.log);

    await new Promise(resolve => setTimeout(resolve, 10));
    console.log('Starting continuous measurement')
    await i2c.i2cWrite(SCD30_ADDR, 4, Buffer.from('00100000', 'hex')).then(console.log);
    await new Promise(resolve => setTimeout(resolve, 10));

    // Sets automatic self calibration
    // await i2c.i2cWrite(SCD30_ADDR, 4, Buffer.from('53060001' + crc8('0001'), 'hex')).then(console.log);

    await new Promise(resolve => setTimeout(resolve, 10));

    while (true) {
        let isReady = false;
        while (!isReady) {
            await new Promise(resolve => setTimeout(resolve, 200));
            await i2c.i2cWrite(SCD30_ADDR, 2, Buffer.from('0202', 'hex'));
            await new Promise(resolve => setTimeout(resolve, 10));
            const readyResult = await i2c.i2cRead(SCD30_ADDR, 3, new Buffer.alloc(3));
            const intResult = parseInt(readyResult.buffer.subarray(0, 2).toString('hex'), 16)
            isReady = !!intResult
        }

        await i2c.i2cWrite(SCD30_ADDR, 2, Buffer.from('0300', 'hex'));
        await new Promise(resolve => setTimeout(resolve, 10));
        await i2c.i2cRead(SCD30_ADDR, 18, new Buffer.alloc(18)).then(({ buffer }) => {
            const resultBuffer = Buffer.alloc((buffer.length * 2) / 3);
            for (let i = 0; i < buffer.length / 3; i++) {
                const receivedBytes = buffer.subarray(i * 3, i * 3 + 2);
                // const crcByte = buf[i * 3 + 2];

                // if (!crcMatches(receivedBytes, crcByte)) {
                //     throw new Error('CRC error');
                // }

                resultBuffer.set(receivedBytes, i * 2);
            }

            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`CO2: ${resultBuffer.readFloatBE(0).toFixed(2)} ppm | Temp: ${resultBuffer.readFloatBE(4).toFixed(2)} °C | Humidity: ${resultBuffer.readFloatBE(8).toFixed(2)} %`);
        });
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
});

function reverseEndian(x) {
    buf = Buffer.allocUnsafe(4)
    buf.writeUIntLE(x, 0, 4)
    return buf.readUIntBE(0, 4)
}
// then(i2c1 => i2c1.readWord(MCP9808_ADDR, TEMP_REG).
//   then(rawData => console.log(toCelsius(rawData))).
//   then(_ => i2c1.close())
// ).catch(console.log);

function crc8(bytes) {
    bytes = Buffer.from(bytes, 'hex')
    const polynomial = 0x31
    let rem = 0xFF

    bytes.forEach(byte => {
        rem ^= byte
        for (let i = 0; i < 8; i++) {
            if (rem & 0x80) {
                rem = (rem << 1) ^ polynomial
            } else {
                rem = rem << 1
            }
        }

        rem &= 0xFF
    })

    return rem.toString(16);
}