const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const port = 3000

const routes = require('./routes')
const app = express()

require('./config/mongoose')

// setting temlate engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files 
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})