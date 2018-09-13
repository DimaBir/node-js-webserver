const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
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
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    console.log('I`ve been called, about');
    return new Date().now;
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        helpers: {
            getQuote: () => {
                request({
                    url: `https://api.chucknorris.io/jokes/random`,
                    json: true
                }, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        console.log(body.value);
                        return body.value;
                    } else {
                        console.log('Unable to fetch weather.');
                    }
                });
            }
        }
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