const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT

const app = express()


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now} ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', err => {
       if (err) {
           console.log('unable to append to server.log')
       }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintance.hbs')
// })

app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', text => text.toUpperCase())

app.get('/', (req, res, next) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Jebo ga responza evo ga'
    })
})

app.get('/about', (req, res, next) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Govno'
       
    })
})

app.get('/bad', (req, res, next) => {
    res.send({
        errorMessage: 'Jebo ga evo i ERRORRRA'
    })
})



app.listen(port)