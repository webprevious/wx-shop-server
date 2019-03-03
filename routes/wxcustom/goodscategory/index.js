const router = require('koa-router')()
const mongoose = require('mongoose')

router.get('/getGoodsCateory', async (ctx, next) => {
  // 获取modle
  const goodsCategory = mongoose.model('goodsCategory')
  await goodsCategory.find().then((res) => {
    ctx.body = {
      code: 1,
      data: res
    }
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

module.exports = router