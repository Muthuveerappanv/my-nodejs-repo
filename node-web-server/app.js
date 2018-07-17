const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var msg = `${now} : ${req.method} : ${req.url}`;
    console.log(msg);
    fs.appendFile('log/server.log', msg + '\n', error => {
        if(error)
            console.log('Error While writing logs to file '+error);
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{maintMsg : 'Site Under Maintenance'});
// })

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to Home Page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send(400, {
        errorMsg: 'Unable to fetch page!'
    });
});

app.get('/project', (req, res) => {
    res.render('projects', {
        pageTitle: 'Project Page',
        projectMsg: 'Project Page'
    });
});

app.listen(port, () => {
    console.log(`Server Up on port ${port}`);
});