const db = require('./db');
const db1 = require('./db1');

module.exports.handleLogin = (email, password) => {
    db.saveUser({ email, password });
};

module.exports.handleDummy = (dum, my) => {
    db1.saveDummy({dum, my});
};