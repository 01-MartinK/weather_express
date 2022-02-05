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

// promise for getting weather
const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(responce => {
            return responce.json();
        })
        .then(data => {
            // get variables
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp)-273.15); // calculade celcius
            // send result
            let result = {
                description: description,
                city: city,
                temp: temp
            }
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
};

// render main page
app.all('/', (req, res) => {
    let city;
    if (req.method == 'GET'){
        city = 'Tartu';
    };
    if (req.method == 'POST'){
        city = req.body.cityname;
    };
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    getWeatherDataPromise(url)
    .then(data => {
        res.render('index', data);
    });
});

// listen at certain port
app.listen(3000);