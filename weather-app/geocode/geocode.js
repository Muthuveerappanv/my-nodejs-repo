const request = require('request');

var geocode = (addressString, callback) => {
    request({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(addressString),
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(`Error Occured while calling google api - ${error}`);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('No Results found');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });
}

var geocodep = (addressString) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(addressString),
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(`Error Occured while calling google api - ${error}`);
            } else if (body.status === 'ZERO_RESULTS') {
                reject('No Results found');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        });
    })
}

module.exports = {
    geocode, geocodep
}
