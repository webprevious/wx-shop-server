const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId: ObjectId,
  userName: String,
  gender: String,
  city: String,
  province: String,
  country: String,
  avatarUrl: String,
  createAt: { type: Date, default: Date.now() }
})

mongoose.model('User', userSchema)