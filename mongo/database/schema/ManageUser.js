const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManageUser = new Schema({
  userName: {type: String, required: true},
  password: {type: String, default: '123456'},
  createAt: {type: Date, default: new Date()},
  role: {type: String, required: true},
  isActive: {type: Boolean, default: true}
})

mongoose.model('ManageUser', ManageUser)