const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(200).send({ name: 'Hello World!', value: 1 });
});

app.get('/users', (req, res) => {
    res.status(200).send([{ name: 'Muthu', age: 26 }, { name: 'Venk', age: 25 }]);
});

app.listen(3000);

module.exports.app = app;