const env = process.env.NODE_ENV || 'dev';
console.log(`******** ${env}`)

if (env === 'dev' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    })
}