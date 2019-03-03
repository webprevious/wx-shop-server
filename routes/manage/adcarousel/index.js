const router = require('koa-router')()
const mongoose = require('mongoose')

router.post('/addAdCarousel', async (ctx, next) => {
  console.log(ctx.request.body)
  // 获取modle
  const AdCarousel = mongoose.model('AdCarousel')
  // 创建数据库操作实例
  let newAdCarousel = new AdCarousel(ctx.request.body)
  await newAdCarousel.save().then(() => {
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
