const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://cdn.w600.comps.canstockphoto.com.tw/%E9%A3%9F%E7%89%A9-%E9%9B%86%E5%90%88-%E5%9C%96%E8%B1%A1-%E5%9C%96%E7%A4%BA_csp5949819.jpg'
  }
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (!req.body.image) {
    req.body.image = 'https://cdn.w600.comps.canstockphoto.com.tw/%E9%A3%9F%E7%89%A9-%E9%9B%86%E5%90%88-%E5%9C%96%E8%B1%A1-%E5%9C%96%E7%A4%BA_csp5949819.jpg'
  }
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


module.exports = router