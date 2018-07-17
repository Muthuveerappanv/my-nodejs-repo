const express = require('express');
const hbs = require('hbs');


var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('myhelper', () =>{
    return new Date().toDateString();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.use((req, res, next) => {
//     res.render('muthu', {
//         sampleMsg: 'Exception'
//     })
// });

app.get('/muthu', (req, res) => {
    res.render('muthu', {
        sampleMsg: `Muthu's Page`
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on 3000');
});