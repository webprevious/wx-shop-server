const router = require('koa-router')()
const mongoose = require('mongoose')

router.get('/getAdCarousel', async (ctx, next) => {
  // 获取modle
  const AdCarousel = mongoose.model('AdCarousel')
  // 直接使用model进行查询，查询不需要创建保存实例
  await AdCarousel.find().then(result => {
    ctx.body = {
      code: 1,
      data: result
    }
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

module.exports = router
