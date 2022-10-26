// 導出一個物件:authenticator函式
// 可以在總路由掛載使用
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) { //req.isAuthenticated()是Passport.js提供的函式
      return next() //如果傳來的request請求已帶驗證，則進行下一個處理
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }
}