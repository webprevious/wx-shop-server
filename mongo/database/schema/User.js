const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId: ObjectId,
  userName: String,
  phone: { unique: true, type: String },
  avatorUrl: String,
  createAt: { type: Date, default: Date.now() }
})

mongoose.model('User', userSchema)