const yargs = require('yargs');

const argv = yargs.options({
    a: {
        demand: true,
        number: true
    },
    b: {
        demand: true,
        number: true
    }
}).argv;

var asyncadd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Number cannot be added');
            }
        }, 1500);
    })
}


asyncadd(argv.a, argv.b).then(output => {
    console.log(output);
    return asyncadd(55, output);
}).then(finaloutput => {
    console.log('Final Output ' + finaloutput);
}).catch((error) => {
    console.log('Error Occured ' + error);
});


// var somePromise = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         //resolve('It worked!');
//         reject('Didnt Work');
//     }, 2000);
// });

// somePromise.then((message) => {
//     console.log(message);
// },
//     (errorMsg) => {
//         console.log(errorMsg);
//     }
// );