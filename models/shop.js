const mongoose = require('mongoose')
const Schema = mongoose.Schema //預設模組
const shopSchema = new Schema({   //成立新屬性的模組
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
})
module.exports = mongoose.model('shop', shopSchema) //輸出名為'Shop'的schema,預設資料來自shopSchema