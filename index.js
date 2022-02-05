// get prequisitions
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended:true}));

// variables
const key = '77f97b598769bf8861004c74e30ebbba';
let city = 'Tartu';

// render main page
app.get('/', (req, res) => {
    // get weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((responce) => {
        return responce.json();
    })
    .then((data) => {
        // get variables
        let description = data.weather[0].description;
        let city = data.name;
        let temp = Math.round(parseFloat(data.main.temp)-273.15); // calculade celcius
        // render variables
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        });
    });
});

// refresh city
app.post('/', (req, res) => {
    let city = req.body.cityname;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((responce) => {
        return responce.json();
    })
    .then((data) => {
        // get variables
        let description = data.weather[0].description;
        let city = data.name;
        let temp = Math.round(parseFloat(data.main.temp)-273.15); // calculade celcius
        // render variables
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        });
    });
});

// listen at certain port
app.listen(3000);