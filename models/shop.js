const mongoose = require('mongoose')
const Schema = mongoose.Schema //預設模組
const shopSchema = new Schema ({   //成立新屬性的模組
  name:{type:String,require:true},
  name_en: { type: String, require: true},
  category: {type:String,require:true},
  image: { type: String, require: true },
  location: { type: String, require: true },
  phone: { type: String, require: true },
  google_map:{ type: String, require: true },
  rating: { type: Number, require: true },
  description: { type: String, require: true },
})
module.exports = mongoose.model('Shop',shopSchema) //輸出名為'Shop'的schema,預設資料來自shopSchema