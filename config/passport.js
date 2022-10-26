const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  //初始化passport模組 
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地策略
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
    (req, email, password, done) => {
      // 這段在passport的authenticate裡已經幫我們驗證了username、password
      // !username || !password會直接return 錯誤訊息'Missing credentials'
      // 也就不會跑下面的
      // if (this.fail === 'Missing credentials') {
      //   return done(null, false, { message: '帳號密碼不能空白！' })
      // }

      User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: '此信箱尚未註冊過！' })
        }
        if (password !== user.password) {
          return done(null, false, { message: '密碼錯誤！' })
        }
        return done(null, user)
      })
        .catch(err => done(err, false))
    }
  ))

  // 序列化與反序列化設定
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}