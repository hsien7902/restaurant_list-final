const express = require('express')
const app = express()
const port = 3000

// get list from restaurant.JSON
const shopList = require('./restaurant.json')

//set express-handlebars & template engine
const exhdbs = require('express-handlebars')

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


app.engine('handlebars', exhdbs({ defaultLayout: 'main' })) //選用handlebars樣板引擎,以main.handlebars為主頁面
app.set('view engine', 'handlebars')
//set&link static file
app.use(express.static('public'))

//set routes path
//主路徑
app.get('/', (req, res) => {
  res.render('index', { restaurant: shopList.results })
})
//showpage 路徑
app.get('/restaurants/:store_id', (req, res) => {
  const store = restaurantList.results.find(store => store.id.toString() === req.params.store_id)
  res.render('show', { restaurant: store })
})
//set search path
app.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  const showstore = restaurantList.results.filter(store => {
    return store.name.toLowerCase().includes(keyword.toLowerCase()) || store.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurant: showstore, keyword: keyword })
})

//start and listen on the Expres server
app.listen(port, () => {
  console.log(`This is running on http://localhost:${port}`)
})