const path = require('path')                // built in module, no installation needed
const express = require ('express')    
const hbs = require ('hbs')                 // za potrebe template-a (partials-a -> just part of a web page)
const forecast = require ('./utils/forecast')   
const geocode = require ('./utils/geocode')  

const app = express()                                            // no arguments

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')          // put do foldera templates rokaj-snimaj\web-server\templates
const partialPath = path.join(__dirname, '../templates/partials' )

// Setup handlebars engine and views location
app.set('view engine', 'hbs')                       // which engine template to install -> hbs 
app.set('views', viewsPath)                         // umjesto u folder views (default), hbs filove su sada u folderu templates
hbs.registerPartials(partialPath)


//  Setup static directory to serve
app.use(express.static(path.join(publicDirPath)))           // root page (home page)

app.get('', (req, res) => {         
    res.render('index', {           // index.hbs
        title: 'Weather app',           
        name: 'Dino'
    })        
})                              

app.get('/about', (req, res) => {         
    res.render('about', {     // about.hbs
        title: 'About us',
        name: 'Dino'
    })               
}) 

app.get ('/help', (req, res) => {
    res.render ('help', {
        message: 'This is the HELP page',
        title: 'Help',
        name: 'Dino'
    })
})

app.get ('/weather', (req, res) => {
    if(!req.query.address){             // http://localhost:3000/weather?address=Botinec
        return res.send ({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {   
        if(error){
            return res.send ({error})  // Return jer ne želimo da se program nastavi nakon što ispiše (zato ne treba else if nakon })
        }

        forecast(longitude, latitude, (error, forecastData) => {    
            if(error){
                return res.send ({error})  
            }
            res.send ({
                address: req.query.address,
                location,
                forecast: forecastData
            }) 
        })
    })
 } )
 



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({                // koristit return da se kod nakon toga ne nastavi (da nemaš više responsa kada možeš imati samo 1)
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send ({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render ('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Dino'
    })
})

app.get('*', (req, res) => {        // * -> sve što nije jednako onom do sada spomenutom (ide po redu od gore prema dolje i traži)
    res.render ('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Dino'
    })
})

app.listen(3000, () => {                              // start up the server at port 3000
    console.log('Server is up on port 3000.')
}) 