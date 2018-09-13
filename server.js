const request = require('request');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// Middleware
app.use(express.static(__dirname + '/public'));


// req - request method: http method, path, parameters and etc
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    })
    next();
})

var NorrisQuote; 

request({
    url: `https://api.chucknorris.io/jokes/random`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        NorrisQuote = body.value;
   } else {
        console.log('Unable to fetch weather.');
    }
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        Norris: NorrisQuote
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});


app.get('/intro', (req, res) => {
    res.render('/public/intro.html');
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});