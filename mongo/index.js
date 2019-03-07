const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
const { resetSigned } = require('./schedule/signed.js')

//立即执行函数
exports.mongodb = async () =>{
  // 数据库连接
	await connect()
	// 引入所有schema
  initSchemas()
  // 定时任务每天刷新签到
  resetSigned()
}