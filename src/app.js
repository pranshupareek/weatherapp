const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const  app = express()

// Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Pranshu Pareek'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Pranshu Pareek'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address,(error , { latitude, longitude ,location }={}) => {
        if (error){
            return res.send({error})
        } else {
            forecast(latitude , longitude,(error,forecastdata) => {
                if (error){
                    return res.send({error})
                }

                res.send({
                    location,
                    forecast: forecastdata,
                    address: req.query.address
                })
            })
        }

    })

    // res.send({
    //     forecast: 'Forecast here',
    //     location: 'Location here',
    //     address: req.query.address
    // })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'FAQ will be available here',
        name: 'Pranshu Pareek'
    })
} )

app.get('/help/*', (req, res) =>{
    res.render('error',{
        message: 'Help article not found.',
        title: '404',
        name: 'Pranshu Pareek'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found',
        title: '404',
        name: 'Pranshu Pareek'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})