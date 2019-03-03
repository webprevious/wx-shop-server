const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
//立即执行函数
exports.mongodb = async () =>{
	await connect()
	// 引入所有schema
	initSchemas()
}