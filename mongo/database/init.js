const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

exports.connect = ()=>{
  //连接数据库
  connectMongo()
  //设置最大连接数
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    //增加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if(maxConnectTimes < 3) {
        maxConnectTimes++
        connectMongo() 
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if(maxConnectTimes < 3){
        maxConnectTimes++
        connectMongo()
      }else{
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    //链接打开的时
    mongoose.connection.once('open',()=>{
      resolve()   
    })
  })
}

function connectMongo() {
  mongoose.connect('mongodb://127.0.0.1:27017/shop', { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if (err) {
      console.log('Connecttion Error' + err)
    } else {
      console.log('MongoDB connected successfully') 
    }
  })
}

// 一次性引入所有Schema文件
exports.initSchemas = () =>{
  // resolve(__dirname,'./schema/','**/*.js') 返回值是一个由传入的多个参数组成的路径，这里代表的意思就是schema中所有文件，除了以.点开头的
  // __dirname在node中就是指文件当前路径的意思
  // glob的作用就是返回一个由匹配规则匹配到的所有文件
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
