const yargs = require('yargs');
const axios = require('axios');
var querystring = require('querystring');

const argv = yargs.
    options({
        a: {
            demand: true,
            describe: 'Address to fetch location for',
            alias: 'address',
            string: true,
            default: 'Chennai, India'
        },
        u: {
            demand: false,
            describe: 'to display temp in celcius or farenheit',
            alias: 'unit',
            string: true,
            default: 'F'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddr = encodeURIComponent(argv.a);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;
var weatherUrl = 'https://api.darksky.net/forecast/dbd31ff1ee0710038e5ddc5084891faa/';
var units;
if (argv.u === 'C') {
    units = 'si';
}

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('No Results found for given adddress');
    } else if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Upgrade to Premium Tier');
    }
    var formattedAddress = response.data.results[0].formatted_address;
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    console.log(formattedAddress, latitude, longitude);
    return axios.get(`${weatherUrl}${latitude},${longitude}`, {
        params: {
            units
        }
    });
}).then(response => {
    console.log(`Current Temperature : ${response.data.currently.temperature}, Feels Like : ${response.data.currently.apparentTemperature}`);
}).catch(error => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Service ' + error.message);
    } else {
        console.log(error.message);
    }

});



