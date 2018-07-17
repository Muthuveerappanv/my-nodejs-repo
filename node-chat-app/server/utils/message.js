var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}

const GOOGLE_MAPS_URI = 'https://google.com/maps?q='

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        locationUrl: `${GOOGLE_MAPS_URI}${lat},${long}`,
        createdAt: moment().valueOf()
    }
}

module.exports = { generateMessage, generateLocationMessage }