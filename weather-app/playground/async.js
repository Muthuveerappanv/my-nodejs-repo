console.log('Starting App');

setTimeout(() => {
    console.log('first async option');
}, (2000));

setTimeout(() => {
    console.log('second async')
}, 0);

console.log('Ending app');