const router = require('koa-router')()
const mongoose = require('mongoose')

// 管理端获取小程序用户列表和查询接口
router.get('/manageGetUserList', async ctx => {
  const User = mongoose.model('User')
  let currentPage = Number(ctx.request.query.currentPage) - 1
  let pageSize = Number(ctx.request.query.pageSize)
  let keyword = ctx.request.query.keyword
  // 根据有无关键字判断是否为搜索
  if (keyword) {
    let total = await User.find({userName: {'$regex': keyword}}).count()
    await User.find({userName: {'$regex': keyword}}).skip(currentPage * pageSize).limit(pageSize).then(result => {
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
    let total = await User.find().count()
    await User.find().skip(currentPage * pageSize).limit(pageSize).then(result => {
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

// 管理端获取管理端用户列表和查询接口
router.get('/manageGetPcUserList', async ctx => {
  const ManageUser = mongoose.model('ManageUser')
  let currentPage = Number(ctx.request.query.currentPage) - 1
  let pageSize = Number(ctx.request.query.pageSize)
  let keyword = ctx.request.query.keyword
  // 根据有无关键字判断是否为搜索
  if (keyword) {
    let total = await ManageUser.find({userName: {'$regex': keyword}}).count()
    await ManageUser.find({userName: {'$regex': keyword}}, {password: 0}).skip(currentPage * pageSize).limit(pageSize).then(result => {
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
    let total = await ManageUser.find().count()
    await ManageUser.find(null, {password: 0}).skip(currentPage * pageSize).limit(pageSize).then(result => {
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

// 管理端新增/修改用户，用户名唯一
router.post('/manAddUpadteUser', async ctx => {
  let ManageUser = mongoose.model('ManageUser')
  let reqData = ctx.request.body
  // 用户名唯一，需要手动判断数据库中是否存在同名
  await ManageUser.find({userName: reqData.userName}).then(async res => {
    // 如果有值，说明存在同名，然后判断是否为修改
    if (res.length) {
      if (reqData.status === 'update') {
        res[0].isActive = reqData.isActive
        res[0].role = reqData.role
        console.log(res)
        await res[0].save().then(result => {
          ctx.body = {
            code: 1,
            data: null
          }
        }).catch(err => {
          ctx.body = {
            code: 0,
            data: err
          }
        })
      } else {
        ctx.body = {
          code: 1,
          msg: '用户名已存在',
          data: null
        }
      }
    } else {
      await ManageUser.create(reqData).then(res => {
        ctx.body = {
          code: 1,
          data: null
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

// 管理端用户初始化密码
router.post('/manInitPassword', async ctx => {
  let ManageUser = mongoose.model('ManageUser')
  let reqData = ctx.request.body
  // 用户名唯一，需要手动判断数据库中是否存在同名
  await ManageUser.findByIdAndUpdate(reqData.id, {password: '123456'}).then(async res => {
    console.log(res)
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