const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const defaultImage = 'https://media.istockphoto.com/vectors/restaurant-icons-vector-id1166105457?s=612x612'

// render new頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, location, phone, google_map, rating, description } = req.body
  let image = req.body.image
  if (!image) {
    image = defaultImage
  }

  Restaurant.create({
    name,
    name_en,
    category,
    location,
    image,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// render detail頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

// render edit頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// 修改detail 
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  // 無放圖片則顯示預設圖
  if (!req.body.image) {
    req.body.image = defaultImage
  }

  Restaurant.findByIdAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


module.exports = router