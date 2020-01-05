const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4561afcb70ad6814d5536021f74f0d29/'+latitude +','+longitude;
    request({url, json:true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined,body.daily.data[0].summary + " It is currently "+ body.currently.temperature +" degrees out. There is a "+ body.currently.precipProbability +" % chance of rain. The Temprature High is: "+body.daily.data[0].temperatureHigh+" The Temprature Low is: "+body.daily.data[0].temperatureLow);
        }
    })
}

module.exports = forecast
