const router = require('koa-router')()
const mongoose = require('mongoose')

// 物品审核接口，支持未通过，通过
router.post('/verifyGoods', async ctx => {
  let reqData = ctx.request.body
  let GoodsMessage = mongoose.model('GoodsMessage')
  await GoodsMessage.findByIdAndUpdate(reqData.goodsId, { goodsStatus: reqData.goodsStatus}).then(res => {
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