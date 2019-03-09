const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const AdSchema = new Schema({
  AdCarouselId: ObjectId,
  adImgUrl: {type: String, required: true},
  goodsId: {type: String, required: true, ref: 'GoodsMessage'},
  createAt: { type: Date, default: Date.now() }
})

mongoose.model('AdCarousel', AdSchema)