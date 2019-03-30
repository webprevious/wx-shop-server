const router = require('koa-router')()
const mongoose = require('mongoose')

// 物品审核接口，支持未通过，通过
router.post('/manVerifyGoods', async ctx => {
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

// 管理端获取待审核列表
router.get('/manGetWaitViewList', async ctx => {
  const GoodsMessage = mongoose.model('GoodsMessage')
  let currentPage = Number(ctx.request.query.currentPage) - 1
  let pageSize = Number(ctx.request.query.pageSize)
  let keyword = ctx.request.query.keyword
  // 根据有无关键字判断是否为搜索
  if (keyword) {
    let total = await GoodsMessage.find({goodsTitle: {'$regex': keyword}}).count()
    await GoodsMessage.find({goodsTitle: {'$regex': keyword}, goodsStatus: 'wait_verify'}).skip(currentPage * pageSize).limit(pageSize).populate('publisherId').then(result => {
      ctx.body = {
        code: 1,
        data: result,
        total
      }
    }).catch((err) => {
      ctx.body = {
        code: 0,
        data: err
      }
    })
  } else {
    let total = await GoodsMessage.find({goodsStatus: 'wait_verify'}).count()
    await GoodsMessage.find({goodsStatus: 'wait_verify'}).skip(currentPage * pageSize).limit(pageSize).populate('publisherId').then(result => {
      ctx.body = {
        code: 1,
        data: result,
        total
      }
    }).catch((err) => {
      ctx.body = {
        code: 0,
        data: err
      }
    })
  }
})

module.exports = router