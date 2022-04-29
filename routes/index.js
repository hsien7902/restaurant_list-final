const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const shops = require('./modules/shops')

//引入路由模組
router.use('/',home) //main router
router.use('/restaurants',shops) // childern page router =>將request導向shops模組



module.exports = router