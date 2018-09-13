const express = require('express');
const norris = require('./playground/norrisQuote');
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

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('getQuote', () => {
    return norris.getNorrisQuote();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs');
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