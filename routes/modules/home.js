const express = require('express')
const router = express.Router()
const sortSelector = require('../../utility/sortSelector')
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  let sort = req.query.sort
  const home = true
  Restaurant.find({})
    .lean()
    .sort(sortSelector(sort))
    .then(restaurants => res.render('index', { restaurants, home }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.includes(keyword)
      })
      res.render('index', { restaurants: filteredRestaurants })
    })
    .catch(error => console.error(error))
})


module.exports = router