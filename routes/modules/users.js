const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  const errors = []
  let name = req.body.name

  // 必填欄位未填的
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '必填欄位不可空白！' })
  }

  // 密碼與確認密碼不符
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '此信箱已註冊過！' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
        .catch(err => console.log(err))
    }

    // 如過使用者未輸入名字，則代入'未命名'
    if (!name) {
      name = '未命名'
    }

    User.create({
      name,
      email,
      password
    })
  })
    // .then(() => res.redirect('/'))
    .then(() => {
      res.locals.isAuthenticated = true
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err) }
    req.flash('success_msg', '您已成功登出。')
    res.redirect('login')
  })
})

module.exports = router