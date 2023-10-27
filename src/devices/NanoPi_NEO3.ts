import { Device, Raster } from '../types';

enum Group {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

function getGpio(gpioRef: string): Raster {
  const [bank, set] = gpioRef.split('_') as [string, string];
  const setKey = set[0] as 'A' | 'B' | 'C' | 'D';

  return {
    line: 8 * Group[setKey] + parseInt(set[1]),
    chip: parseInt(bank.replace('GPIO', ''))
  };
}

export const NanoPi_NEO3: Device = {
  gpio: {
    27: getGpio('GPIO0_D3'),
    66: getGpio('GPIO2_A2'),
    79: getGpio('GPIO2_B7'),
    81: getGpio('GPIO2_C1'),
    82: getGpio('GPIO2_C2'),
    83: getGpio('GPIO2_C3'),
    87: getGpio('GPIO2_C7'),
    96: getGpio('GPIO3_A0'),
    97: getGpio('GPIO3_A1'),
    98: getGpio('GPIO3_A2'),
    100: getGpio('GPIO3_A4'),
    101: getGpio('GPIO3_A5'),
    102: getGpio('GPIO3_A6'),
    103: getGpio('GPIO3_A7'),
    104: getGpio('GPIO3_B0')
  }
};
