//設定資料庫連線
const mongoose = require('mongoose')
const Shop = require('../shop')
const shopList = require('../../restaurant.json').results
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//執行環境另一解:"mongodb://localhost/restaurant-list"

//設定連線狀態=>監聽連線成功與否
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Shop.create(shopList).then(() => {
    console.log('get shopseeder done')
    db.close()
  }).catch(error => { console.log(error) })
})

