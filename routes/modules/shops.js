const express = require('express')
const router = express.Router()
const Shop = require('../../models/shop')

//set search path
router.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword.trim().toLowerCase()
  return Shop.find()
    .lean().then(shop => {
      const pickedShop = shop.filter(shops => shops.name.toLowerCase().includes(keyword) || shops.category.toLowerCase().includes(keyword))
      res.render('index', { restaurant: pickedShop, keyword: keyword })
    })
    .catch(error => console.log(error))
})

// add new page 路徑
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Shop.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page 路徑
router.get('/:id', (req, res) => {
  const id = req.params.id //mongodb自動生成id
  return Shop.findById(id)
    .lean()
    .then(shop => res.render('detail', { restaurant: shop }))
    .catch(error => console.log(error))
})

// edit page 路徑
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Shop.findById(id)
    .lean()
    .then((shop) => res.render('edit', { restaurant: shop }))
    .catch(error => console.log(error))
})
router.post('/:id', (req, res) => {
  const id = req.params.id
  return Shop.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//set delete path
router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Shop.findById(id)
    .then(shop => shop.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



//匯出shops模組
module.exports = router