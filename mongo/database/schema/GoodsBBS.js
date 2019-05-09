const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const GoodsBBSSchema = new Schema({
  BBSId: ObjectId,
  goodsId: {type: String, required: true, ref: 'GoodsMessage'},
  bbserId: { type: String, required: true, ref: 'User' },
  bbsMessage: { type: String, required: true},
  bbsAt: { type: Date, default: Date.now() }
})

mongoose.model('GoodsBBS', GoodsBBSSchema)
