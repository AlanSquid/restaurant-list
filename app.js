const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results


// setting temlate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
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

  res.render('index', { restaurants: filteredRestaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})