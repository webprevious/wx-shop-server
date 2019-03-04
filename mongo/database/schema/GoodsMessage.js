const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const GoodsMessageSchema = new Schema({
  GoodsId: ObjectId,
  publisherId: { required: true, type: String},
  goodsTitle: { required: true, type: String},
  goodsPrice: { required: true, type: Number},
  goodsDetailMsg: { required: true, type: String},
  goodsPics: { required: true, type: Array},
  goodsCategoryId: { required: true, type: String},
  goodsBussPath: { required: true, type: Array},
  goodsConnWx: String,
  goodsConnQq: String,
  goodsConnPhone: String,
  goodsStatus: { default: 'wait_verify', type: String},
})

mongoose.model('PublishGoods', GoodsMessageSchema)