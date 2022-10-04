const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json').results
const Restaurant = require('./models/restaurant.js')

mongoose.connect(process.env.MONGODB_RESTAURANT_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting temlate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', restaurant)
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const filteredRestaurants = restaurantList.filter(restaurant => {
    return restaurant.name.includes(keyword) ||
      restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
  })

  res.render('index', { restaurantList: filteredRestaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})