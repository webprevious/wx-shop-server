const router = require('koa-router')()
const mongoose = require('mongoose')
// 解决使用findByIdAndUpdate警告问题，useFindAndModify默认为true，如果使用findAnd这种多操作的方法，mongoose会优先使用FindAndModify导致警告，设置为false他就会原生调用你所写的方法
mongoose.set('useFindAndModify', false)

// 发布物品和修改物品接口
router.post('/publishGoods', async (ctx, next) => {
  const GoodsMessage = mongoose.model('GoodsMessage')
  // 发布物品和修改物品共用一个接口，以是否传了物品id作为区别
  let reqData = ctx.request.body
  // 传了物品id说明是修改
  if (reqData.goodsId) {
    // 涉及到数据修改，再加一层权限鉴定，只允许自己修改自己的物品
    const res = await GoodsMessage.find({_id: reqData.goodsId, publisherId: reqData.publisherId})
    if (!res.length) {
      // 没有权限就终止执行后面的修改程序
      return ctx.body = {
        code: 0,
        data: 'no permission'
      }
    }
    // 有权限继续执行修改
    await GoodsMessage.findByIdAndUpdate(reqData.goodsId, reqData).then(res => {
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
    await GoodsMessage.create(reqData).then(res => {
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
  let GoodsMessage = mongoose.model('GoodsMessage')
  await GoodsMessage.findById(reqData.goodsId).then(async res => {
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
  let GoodsMessage = mongoose.model('GoodsMessage')
  await GoodsMessage.findById(ctx.query.goodsId).then(res => {
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

// 购买物品接口
router.post('/buyGoods', async ctx => {
  let GoodsMessage = mongoose.model('GoodsMessage')
  let reqData = ctx.request.body
  await GoodsMessage.findById(reqData.goodsId).then(async res => {
    // 自己不能购买自己的
    if (res.publisherId === reqData.buyer) {
      ctx.body = {
        code: 0,
        data: '自己不能购买自己的物品'
      }
      return false
    } else {
      res.goodsBuyer = reqData.buyer
      res.goodsStatus = 'be_sale'
      res.buyAt =  Date.now()
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
    }
  }).catch(err => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

// 根据物品状态和发布者id计算出我发布的物品、我卖出的物品
router.post('/getMyPublishOrSale', async ctx => {
  let reqData = ctx.request.body
  let GoodsMessage = mongoose.model('GoodsMessage')
  // 根据是否传物品卖出状态来判断获取我发布的全部物品和卖出的物品
  if (reqData.goodsStatus) {
    // 传了状态说明查询我卖出的
    // 状态分为待审核wait_verify
    // 审核通过pass_verify
    // 审核未通过not_verify
    // 已出售be_sale
    await GoodsMessage.find({ publisherId: reqData.publisherId, goodsStatus: reqData.goodsStatus }).then(res => {
      if (res.length) {
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
    }).catch(err => {
      ctx.body = {
        code: 0,
        data: res
      }
    })
  } else {
    // 没有传状态说明是查询全部
    await GoodsMessage.find({ publisherId: reqData.publisherId }).then(res => {
      if (res.length) {
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
    }).catch(err => {
      ctx.body = {
        code: 0,
        data: res
      }
    })
  }
})

// 登陆者买到的接口
router.post('/getMyBuy', async ctx => {
  let GoodsMessage = mongoose.model('GoodsMessage')
  let reqData = ctx.request.body
  await GoodsMessage.find({goodsBuyer: reqData.userId}).then(res => {
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


