const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB_RESTAURANT_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
  console.log('done')
})