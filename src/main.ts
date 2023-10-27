import binding from 'bindings';
const opengpio: {
    info: () => string;
} = binding('opengpio');

export default opengpio;