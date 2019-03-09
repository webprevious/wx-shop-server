const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const GoodsMessageSchema = new Schema({
  GoodsId: ObjectId,
  publisherId: { required: true, type: String, ref: 'User'},
  goodsTitle: { required: true, type: String},
  goodsPrice: { required: true, type: Number},
  goodsDetailMsg: { required: true, type: String},
  goodsPics: { required: true, type: Array, default: [] },
  goodsCategoryId: { required: true, type: String, ref: 'GoodsCategory'},
  goodsBussPath: { required: true, type: Array},
  goodsConnWx: String,
  goodsConnQq: String,
  goodsConnPhone: String,
  goodsStatus: { default: 'wait_verify', type: String},
  goodsViewTimes: { default: 0, type: Number },
  publishAt: { type: Date, default: Date.now() }
})

mongoose.model('PublishGoods', GoodsMessageSchema)