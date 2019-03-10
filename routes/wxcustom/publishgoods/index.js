const router = require('koa-router')()
const mongoose = require('mongoose')
// 解决使用findByIdAndUpdate警告问题，useFindAndModify默认为true，如果使用findAnd这种多操作的方法，mongoose会优先使用FindAndModify导致警告，设置为false他就会原生调用你所写的方法
mongoose.set('useFindAndModify', false)

// 发布物品和修改物品接口
router.post('/publishGoods', async (ctx, next) => {
  const PublishGoods = mongoose.model('PublishGoods')
  // 发布物品和修改物品共用一个接口，以是否传了物品id作为区别
  let reqData = ctx.request.body
  // 传了物品id说明是修改
  if (reqData.goodsId) {
    // 涉及到数据修改，再加一层权限鉴定，只允许自己修改自己的物品
    const res = await PublishGoods.find({_id: reqData.goodsId, publisherId: reqData.publisherId})
    if (!res.length) {
      // 没有权限就终止执行后面的修改程序
      return ctx.body = {
        code: 0,
        data: 'no permission'
      }
    }
    // 有权限继续执行修改
    await PublishGoods.findByIdAndUpdate(reqData.goodsId, reqData).then(res => {
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
  } else {
    // 发布新物品逻辑
    await PublishGoods.create(reqData).then(res => {
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
  }
})

// 记录浏览次数
router.post('/addGoodsViewTimes', async ctx => {
  let reqData = ctx.request.body
  let PublishGoods = mongoose.model('PublishGoods')
  await PublishGoods.findById(reqData.goodsId).then(async res => {
    res.goodsViewTimes ++
    await res.save().then(res => {
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
  }).catch(err => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

// 根据物品id获取物品详情
router.get('/getGoodsDetailById', async ctx => {
  let PublishGoods = mongoose.model('PublishGoods')
  await PublishGoods.findById(ctx.query.goodsId).then(res => {
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

