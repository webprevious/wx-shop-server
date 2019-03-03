const router = require('koa-router')()
const mongoose = require('mongoose')

router.post('/register', async (ctx, next) => {
  // 获取modle
  const User = mongoose.model('User')
  // 创建数据库操作实例
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 1,
      data: {}
    }
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

module.exports = router