const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
//立即执行函数
exports.mongodb = async () =>{
	await connect()
	// 引入所有schema
	initSchemas()
	const User = mongoose.model('User')
	let oneUser = new User({
		userName: 'jack',
		phone: '15797684958',
		avatorUrl: 'https://jspang.com/static//myimg/blogtouxiang.jpg'
	})
	oneUser.save().then(async () => {
		console.log('插入成功')
		let users = await User.findOne({}).exec()
		console.log('+++++++++++++++++++++++++')
		console.log(users)
		console.log('+++++++++++++++++++++++++')
	})
}