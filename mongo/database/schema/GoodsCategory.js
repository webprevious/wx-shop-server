const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const CategorySchema = new Schema({
  AdCarouselId: ObjectId,
  title: String,
  createAt: { type: Date, default: Date.now() }
})

mongoose.model('goodsCategory', CategorySchema)