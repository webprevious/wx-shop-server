const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const CategorySchema = new Schema({
  AdCarouselId: ObjectId,
  title: String,
  isActive: {type: Boolean, default: true},
  createAt: {type: Date, default: Date.now()}
})

mongoose.model('GoodsCategory', CategorySchema)
