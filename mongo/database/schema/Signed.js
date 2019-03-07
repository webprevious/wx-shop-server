const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const signedSchema = new Schema({
  id: ObjectId,
  userId: { type: String, required: true },
  times: { type: String, default: '1' },
  todayIsSigned: { type: Boolean, default: true },
  signedAt: { type: Date, default: Date.now() }
})

mongoose.model('Signed', signedSchema)