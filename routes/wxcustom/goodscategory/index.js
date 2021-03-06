const router = require('koa-router')()
const mongoose = require('mongoose')

// 获取分类tab列表
router.get('/getGoodsCateory', async (ctx, next) => {
  // 获取modle
  const GoodsCategory = mongoose.model('GoodsCategory')
  await GoodsCategory.find({isActive: true}).then((res) => {
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
  const GoodsMessage = mongoose.model('GoodsMessage')
  // 如果是1那就是请求推荐
  // 获取推荐tab下的物品，目前没有加入算法和复杂计算，只是找出数据库中所有数据
  let currentPage = Number(reqData.currentPage) - 1
  let pageSize = Number(reqData.pageSize)
  if (reqData.goodsCategoryId === '1') {
    let total = await GoodsMessage.find({goodsStatus: 'pass_verify'}).count()
    await GoodsMessage.find({goodsStatus: 'pass_verify'}).sort({_id: -1}).skip(currentPage * pageSize).limit(pageSize).populate('publisherId').then(res => {
      ctx.body = {
        code: 1,
        data: res,
        total
      }
    }).catch(err => {
      ctx.body = {
        code: 0,
        data: err
      }
    })
  } else {
    let total = await GoodsMessage.find({goodsCategoryId: reqData.goodsCategoryId, goodsStatus: 'pass_verify'}).count()
    await GoodsMessage.find({goodsCategoryId: reqData.goodsCategoryId, goodsStatus: 'pass_verify'}).sort({_id: -1}).skip(currentPage * pageSize).limit(pageSize).populate('publisherId').then(res => {
      if (res) {
        ctx.body = {
          code: 1,
          data: res,
          total
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

// 猜你喜欢，目前只是随机出现2个，如果未登录不会请求接口
router.post('/getUserLove', async ctx => {
  const GoodsMessage = mongoose.model('GoodsMessage')
  await GoodsMessage.find({goodsStatus: 'pass_verify'}).populate('publisherId').then(res => {
    if (res.length <= 2) {
      ctx.body = {
        code: 1,
        data: res
      }
    } else {
      // 要取得个数
      let num = 2
      let result = []
      for (let i = 0; i < num; i++) {
        let ran = Math.floor(Math.random() * res.length)
        result.push(res.splice(ran, 1)[0])
      }
      ctx.body = {
        code: 1,
        data: result
      }
    }
  })
})

module.exports = router