const request = require('request');

var weather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/dbd31ff1ee0710038e5ddc5084891faa/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(`IO Error Occured while calling weather api - ${error}`);
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    });
}

var weatherp = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/dbd31ff1ee0710038e5ddc5084891faa/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(`IO Error Occured while calling weather api - ${error}`);
            } else if (response.statusCode === 400) {
                reject('Unable to fetch weather.');
            } else if (response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                })
            }
        });
    });
}

module.exports = {
    weather, weatherp
}


