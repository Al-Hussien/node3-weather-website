const path = require('path');//core module
const express = require('express');//express as a function
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');
const app = express();//so we can configure using this const variable

//Define paths for Express config
const publicDirectroryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))//use is used to customize your server

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Alhussien Madian'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Alhussien Madian'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is a help message as my text',
        name: 'Alhussien Madian',
    });
});

app.get('/weather', (req, res)=>{

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a weather location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}= {})=>{
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            });
        });
    });
        // res.send({
        //     forecast:'It is snowing',
        //     forecast:'Philadelphia',
        //     location: req.query.address
        // });
});




app.get('/products', (req, res)=>{

    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    });
});







app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Alhussien Madian',
        errorMessage: 'Help article not found.'
    });
});
app.get('*', (req, res)=>{
    res.render('404',{
        title: 404,
        errorMessage: 'Page not found.',
        name: 'Alhussien Madian'
    });
});



app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
