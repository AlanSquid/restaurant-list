const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  category: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  phone: { type: String },
  google_map: { type: String },
  rating: { type: Number },
  description: { type: String },
  userId: {
    type: Schema.Types.ObjectId, //用來連向另一個資料物件
    ref: 'User', // type & ref一起設定，告知參考對象是User model
    index: true, // 讓userId成索引
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)