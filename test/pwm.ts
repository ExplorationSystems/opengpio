import { NanoPi_NEO3 } from '../src';
const pwm = NanoPi_NEO3.pwm(NanoPi_NEO3.bcm.GPIO2_B7, 0.5, 50);


setTimeout(() => {
    let dutyCycle = 0.0;
    let direction = 1;
    setInterval(() => {
        dutyCycle += direction * 0.01;
        if (dutyCycle >= 1) {
            dutyCycle = 1;
            direction = -1;
        } else if (dutyCycle <= 0.0) {
            dutyCycle = 0.0;
            direction = 1;
        }
        console.log(dutyCycle);
        pwm.setDutyCycle(dutyCycle);
    }, 50);
}, 5000);