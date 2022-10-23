const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, default: '未命名' },
  email: { type: String, require: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)