const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  // 如過使用者未輸入名字，則代入'未命名'
  let name = req.body.name
  if (!name) {
    name = '未命名'
  }
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('此信箱已註冊過')
      return res.render('/register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.create({
      name,
      email,
      password
    })
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err) }
    res.redirect('/users/login')
  })
})

module.exports = router