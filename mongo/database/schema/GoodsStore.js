const mongoose = require('mongoose')
const Schema = mongoose.Schema

let GoodsStoreSchema = new Schema({
  storeMan: { type: String, required: true, ref: 'User' },
  goodsId: { type: String, required: true, ref: 'GoodsMessage' },
  isStore: { type: Boolean, required: true },
  buyAt: { type: Date, default: Date.now() }
})

mongoose.model('GoodsStore', GoodsStoreSchema)
