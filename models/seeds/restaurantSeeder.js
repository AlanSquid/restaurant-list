const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('./restaurant').results
const userList = require('./user').results


db.once('open', () => {
  Promise.all(
    userList.map((user, userInidex) => {
      return User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 5)
      })
        .then(user => {
          const userRestaurants = []
          restaurantList.forEach((restaurant, restIndex) => {
            if (restIndex >= 3 * userInidex && restIndex < 3 * (userInidex + 1)) {
              restaurant.userId = user._id
              userRestaurants.push(restaurant)
            }
          })
          return Restaurant.create(userRestaurants)
        })
    })
  )
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.log(err))
})








