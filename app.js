const express = require('express')
const app = express()
const port = 3000
const Shop = require('./models/shop')
const routes = require('./routes') //引用路由器

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
app.use(bodyParser.urlencoded({ extended: true })) //將req.body資料切換js物件
app.use(routes) //將request 導入路由器

//set routes path
//主路徑轉移routes



//start and listen on the Expres server
app.listen(port, () => {
  console.log(`This is running on http://localhost:${port}`)
})