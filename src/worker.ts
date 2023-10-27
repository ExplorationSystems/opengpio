// This is an worker process for the lib, allowing node to execute long running syncronous tasks in a separate thread
import lib from './lib';

process.on('message', ([method, ...args]) => {
  if (method === 'watch') {
    const [chip, line, edge] = args;
    lib.watch(chip, line, edge, (value: boolean) => {
      if (process.send) process.send(value);
      else {
        throw new Error('process.send is undefined');
      }
    });
  } else if (method === 'pwm') {
    const [chip, line, dutyCycle, frequency] = args;
    lib.pwm(chip, line, dutyCycle, frequency);
  } else {
    throw new Error(`Unknown method ${method}`);
  }
});
