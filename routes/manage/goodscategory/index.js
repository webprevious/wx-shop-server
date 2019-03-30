const router = require('koa-router')()
const mongoose = require('mongoose')

// 新增分类
router.post('/addGoodsCateory', async (ctx, next) => {
  // 获取modle
  const GoodsCategory = mongoose.model('GoodsCategory')
  // create存操作方法不需要创建保存实例，存入字段需要跟前端传入对应
  let reqData = ctx.request.body
  console.log(reqData)
  // 新增和修改共用此接口
  // 如果新增
  if (reqData.status === 'add') {
    console.log(reqData)
    await GoodsCategory.create(reqData).then(res => {
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
    // 修改逻辑
    await GoodsCategory.findByIdAndUpdate(reqData._id, reqData).then(res => {
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
})

// 管理端获取分类tab列表
router.get('/manageGetGoodsCateory', async (ctx, next) => {
  // 获取modle
  const GoodsCategory = mongoose.model('GoodsCategory')
  let currentPage = Number(ctx.request.query.currentPage) - 1
  let pageSize = Number(ctx.request.query.pageSize)
  let keyword = ctx.request.query.keyword
  // 根据有无关键字判断是否为搜索
  if (keyword) {
    let total = await GoodsCategory.find({title: {'$regex': keyword}}).count()
    await GoodsCategory.find({title: {'$regex': keyword}}).skip(currentPage * pageSize).limit(pageSize).then(result => {
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
    let total = await GoodsCategory.find().count()
    await GoodsCategory.find().skip(currentPage * pageSize).limit(pageSize).then(result => {
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