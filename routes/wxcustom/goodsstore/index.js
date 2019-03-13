const router = require('koa-router')()
const mongoose = require('mongoose')

// 收藏和取消收藏共用接口
router.post('/storeGoods', async ctx => {
  let reqData = ctx.request.body
  let GoodsStore = mongoose.model('GoodsStore')
  await GoodsStore.findOne({ goodsId: reqData.goodsId, storeMan: reqData.storeMan }).then(async res => {
    // 如果有值说明之前有记录，只需要将传过来的确认收藏或者取消收藏更新即可
    if (res) {
      res.isStore = reqData.isStore
      await res.save().then(result => {
        ctx.body = {
          code: 1,
          data: result
        }
      }).catch(err => {
        ctx.body = {
          code: 0,
          data: err
        }
      })
    } else {
      // 之前没有记录，直接写入数据库
      await GoodsStore.create(reqData).then(res => {
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

// 判断某人对某商品是否收藏
router.post('/judgeStore', async ctx => {
  let GoodsStore = mongoose.model('GoodsStore')
  let reqData = ctx.request.body
  await GoodsStore.findOne({ goodsId: reqData.goodsId, storeMan: reqData.storeMan }).then(res => {
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

// 获取用户收藏列表
router.post('/storeList', async ctx => {
  let GoodsStore = mongoose.model('GoodsStore')
  let reqData = ctx.request.body
  await GoodsStore.find({ storeMan: reqData.storeMan }).populate({path: 'goodsId', populate: { path: 'publisherId'}}).then(res => {
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