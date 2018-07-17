const moment = require('moment');
var date = moment();
date.add('year', -1)
console.log(date.format('MMM Do Y, h:mm a'));