const router = require('koa-router')()
const mongoose = require('mongoose')

router.post('/addGoodsCateory', async (ctx, next) => {
  console.log(ctx.request.body)
  // 获取modle
  const goodsCategory = mongoose.model('goodsCategory')
  // 创建数据库操作实例
  let newgoodsCategory = new goodsCategory(ctx.request.body)
  await newgoodsCategory.save().then(() => {
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