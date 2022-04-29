//設定資料庫連線
const db = require('../../config/mongoose')

const Shop = require('../shop')
const shopList = require('../../restaurant.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  Shop.create(shopList)
    .then(() => {
      console.log('get shopseeder done')
      db.close()  //關閉該資料重複輸入?
    })
    .catch(error => console.log(error))
})

