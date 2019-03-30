const router = require('koa-router')()
const mongoose = require('mongoose')

// 新增轮播图接口
router.post('/addAdCarousel', async (ctx, next) => {
  // 获取modle
  const AdCarousel = mongoose.model('AdCarousel')
  let reqData = ctx.request.body
  console.log(reqData)
  // 新增和修改共用此接口
  // 如果新增
  if (reqData.status === 'add') {
    console.log(reqData)
    await AdCarousel.create(reqData).then(res => {
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
    await AdCarousel.findByIdAndUpdate(reqData._id, reqData).then(res => {
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

// 管理端获取轮播图列表接口
router.get('/manageGetAdCarousel', async (ctx, next) => {
  // 获取modle
  const AdCarousel = mongoose.model('AdCarousel')
  // 直接使用model进行查询，查询不需要创建保存实例
  console.log(ctx.request.query)
  let currentPage = Number(ctx.request.query.currentPage) - 1
  let pageSize = Number(ctx.request.query.pageSize)
  let keyword = ctx.request.query.keyword
  // 根据有无关键字判断是否为搜索
  if (keyword) {
    let total = await AdCarousel.find({adName: {'$regex': keyword}}).count()
    await AdCarousel.find({adName: {'$regex': keyword}}).skip(currentPage * pageSize).limit(pageSize).then(result => {
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
    let total = await AdCarousel.find().count()
    await AdCarousel.find().skip(currentPage * pageSize).limit(pageSize).then(result => {
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

// 删除轮播图，暂时不做

module.exports = router
