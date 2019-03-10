const router = require('koa-router')()
const mongoose = require('mongoose')

// 获取分类tab列表
router.get('/getGoodsCateory', async (ctx, next) => {
  // 获取modle
  const GoodsCategory = mongoose.model('GoodsCategory')
  await GoodsCategory.find().then((res) => {
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

// 根据分类tab的id获取该分类下的物品
router.post('/getGoodsByCategoryId', async ctx => {
  let reqData = ctx.request.body
  const PublishGoods = mongoose.model('PublishGoods')
  // 如果是1那就是请求推荐
  // 获取推荐tab下的物品，目前没有加入算法和复杂计算，只是找出数据库中所有数据
  if (reqData.goodsCategoryId === '1') {
    await PublishGoods.find(null, {goodsFirstPic: 1, goodsTitle: 1, goodsPrice: 1, goodsViewTimes: 1}).then(res => {
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
  } else {
    await PublishGoods.find({goodsCategoryId: reqData.goodsCategoryId}, {goodsFirstPic: 1, goodsTitle: 1, goodsPrice: 1, goodsViewTimes: 1}).then(res => {
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
    }).catch(err => {
      ctx.body = {
        code: 0,
        data: err
      }
    })
  }
})

module.exports = router