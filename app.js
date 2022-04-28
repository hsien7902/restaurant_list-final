const express = require('express')
const app = express()
const port = 3000
const Shop = require('./models/shop')

// get list from restaurant.JSON
// const shopList = require('./restaurant.json')

//set express-handlebars & template engine
const exhdbs = require('express-handlebars')

//設body-parser將req.body轉換JS可用的物件
const bodyParser = require('body-parser')

//載入mongodb=>設定mongo連線
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//設定連線狀態=>監聽連線成功與否
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exhdbs({ defaultLayout: 'main', extname: '.hbs' })) //選用handlebars樣板引擎,以main.handlebars為主頁面
app.set('view engine', 'hbs') //啟動hbs引擎
//set&link static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//set routes path
//主路徑
app.get('/', (req, res) => {
  Shop.find().lean()
    .then(shops =>
      res.render('index', { restaurant: shops })
    ).catch(error => console.log(error))

})
//detail page 路徑
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id //mongodb自動生成id
  return Shop.findById(id)
    .lean()
    .then(shop => res.render('detail', { restaurant: shop }))
    .catch(error => console.log(error))
})
// add new page 路徑
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Shop.create({ name: name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// edit page 路徑
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Shop.findById(id)
    .lean()
    .then((shop) => res.render('edit', { restaurant: shop }))
    .catch(error => console.log(error))
})
app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Shop.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})

//set search path
app.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword.trim().toLowerCase()
  return Shop.find()
    .lean().then(shop => {
      const pickedShop = shop.filter(shop => shop.name.toLowerCase().includes(keyword) || shop.category.toLowerCase().includes(keyword))
      res.render('index', { restaurant: pickedShop, keyword: keyword })
    })
    .catch(error => console.log(error))

  // const showstore = restaurantList.results.filter(store => {
  //   return store.name.toLowerCase().includes(keyword.toLowerCase()) || store.category.toLowerCase().includes(keyword.toLowerCase())
  // })
  // res.render('index', { restaurant: showstore, keyword: keyword })
})

//start and listen on the Expres server
app.listen(port, () => {
  console.log(`This is running on http://localhost:${port}`)
})