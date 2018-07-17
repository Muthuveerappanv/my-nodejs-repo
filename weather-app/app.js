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

// callback
geocode.geocode(argv.a, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(JSON.stringify(result, undefined, 2));
        weather.weather(result.latitude, result.longitude, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(JSON.stringify(result, undefined, 2));
            }
        })
    }
});




