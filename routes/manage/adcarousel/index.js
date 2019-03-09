const router = require('koa-router')()
const mongoose = require('mongoose')

router.post('/addAdCarousel', async (ctx, next) => {
  // 获取modle
  const AdCarousel = mongoose.model('AdCarousel')
  // 存操作需要创建保存实例，存入字段需要跟前端传入对应
  let newAdCarousel = new AdCarousel(ctx.request.body)
  await newAdCarousel.save().then(res => {
    ctx.body = {
      code: 1,
      data: res
    }
  }).catch(err => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

module.exports = router
