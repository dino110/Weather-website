const request = require ('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6963ba45a49ef0b399040407e0ee3303&query=' + latitude +',' + longitude
    request ({url, json: true}, (error, {body} = {} )=> {    // url umjesto url: url  ; {body} umjesto result.body
        if (error) {
        callback ('No intertnet access', undefined)
        } else if ( body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback (undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. The humidity is ' + body.current.humidity + '.', body.location.region + ',' + body.location.country)
            //console.log(body)
        }
    })
}

module.exports = forecast
