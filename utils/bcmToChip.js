try{
const bcm = process.argv[2] ?? '';
const [chip, line] = bcm.toUpperCase().split('_');
const chipNumber = parseInt(chip.replace('GPIO', ''));
const lineNumberParts = line.split('');
const lineNumberOffset = {
    A: 0,
    B: 1,
    C: 2,
    D: 3
}[lineNumberParts[0]] * 8;
const lineNumber = lineNumberOffset + parseInt(lineNumberParts[1]);
console.log('Chip:', chipNumber, 'Line:', lineNumber);
}catch(error){
    console.error('The provided BCM reference was invalid.');
    console.error(error);
}