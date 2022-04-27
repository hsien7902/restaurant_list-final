const mongoose = require('mongoose')
const Schema = mongoose.Schema //預設模組
// const shopSchema = new Schema ({   //成立新屬性的模組

//   name:{
//     name:String,
//     require:true
//   },
//   category: {
//     name:String,
//     require:true
//   }
// })
module.exports = mongoose.model('shop',Schema)