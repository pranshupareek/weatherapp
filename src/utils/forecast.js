const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?appid=b4a7b1254951ea5bfb4a1ba3f0eda678&lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)
    request({url, json: true }, (error, {body}={}) => {
        if (error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.cod!==200){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, 'Current weather: '+body.weather[0].description+'. It is currently '+Math.floor(body.main.temp)/10+' degrees out. Maximum temperature is '+Math.floor(body.main.temp_min)/10+ ' degrees and Minimum is '+Math.floor(body.main.temp_min)/10+' degrees today.'//{
            //     weather: body.weather[0].description,
            //     temp: Math.floor(body.main.temp)/10
            // }
            )
        }
    })
}

module.exports = forecast