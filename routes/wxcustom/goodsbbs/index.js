const router = require('koa-router')()
const mongoose = require('mongoose')

// 根据物品id获取留言
router.get('/getBBS', async (ctx, next) => {
  let GoodsBBS = mongoose.model('GoodsBBS')
  await GoodsBBS.find({goodsId: ctx.query.goodsId}).then(res => {
    if (res) {
      ctx.body = {
        code: 1,
        data: res
      }
    } else {
      ctx.body = {
        code: 0,
        data: res
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

// 发表留言
router.post('/publishBBS', async (ctx,next) => {
  let GoodsBBS = mongoose.model('GoodsBBS')
  await GoodsBBS.create(ctx.request.body).then(res => {
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
