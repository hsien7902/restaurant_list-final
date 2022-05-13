const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes') //引用路由器
require('./config/mongoose') //直接引用mongoose.js 連線
require('dotenv').config()

//set express-handlebars & template engine
const exhdbs = require('express-handlebars')
//設body-parser將req.body轉換JS可用的物件
const bodyParser = require('body-parser')


app.engine('hbs', exhdbs({ defaultLayout: 'main', extname: '.hbs' })) //選用handlebars樣板引擎,以main.handlebars為主頁面
app.set('view engine', 'hbs') //啟動hbs引擎
//set&link static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })) //將req.body資料切換js物件
app.use(routes) //將request 導入路由器

//set routes path 主路徑轉移routes

//start and listen on the Expres server
app.listen(port, () => {
  console.log(`This is running on http://localhost:${port}`)
})