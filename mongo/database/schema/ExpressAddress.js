const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpressAddressSchema = new Schema({
  goodsId: {type: String, required: true, ref: 'GoodsMessage'},
  buyer: {type: String, required: true, ref: 'User'},
  receiver: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
})

mongoose.model('ExpressAddress', ExpressAddressSchema)