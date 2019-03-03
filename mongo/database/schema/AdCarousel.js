const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const AdSchema = new Schema({
  AdCarouselId: ObjectId,
  adImgUrl: String,
  goodsId: String,
  createAt: { type: Date, default: Date.now() }
})

mongoose.model('AdCarousel', AdSchema)