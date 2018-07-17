module.exports.add = (a, b) => a + b;

module.exports.asyncadd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}

module.exports.square = (a) => a * a;

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 1000);
}

module.exports.setName = (user, fullName) => {
    var split = fullName.split(' ');
    user.fname = split[0];
    user.lname = split[1];
    return user;
}