const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.
    options({
        a: {
            demand: true,
            describe: 'Address to fetch location for',
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv.a);

// promise
geocode.geocodep(argv.a).then((result1) => {
    return weather.weatherp(result1.latitude, result1.longitude);
}).then((result2) => {
    console.log(JSON.stringify(result2, undefined, 2));
}).catch((error) => {
    console.log(`Error Thrown:::: ${error}`);
})



