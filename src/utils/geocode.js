const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGlubzExMCIsImEiOiJja2J3NXBha2MwY3c0MnRucXB6ZTJqaDFoIn0.LuMh3c1F_rkFXY_w3p20Pg&limit=1'

    request({ url, json: true }, (error, {body} = {}) => {    // {body} umjesto response
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],     // više ne treba response. prije body....
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode