const request = require('request');

var getNorrisQuote = () => {
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

module.exports.getNorrisQuote = getNorrisQuote;
