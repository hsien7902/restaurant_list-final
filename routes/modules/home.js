const express = require('express')
const router = express.Router()
const Shop = require('../../models/shop')
//定義首頁
router.get('/', (req, res) => {
  Shop.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(shops =>
      res.render('index', { restaurant: shops })
    ).catch(error => console.log(error))

})



//匯出路由模組
module.exports = router