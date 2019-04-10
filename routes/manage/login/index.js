const router = require('koa-router')()
const mongoose = require('mongoose')

// 登录接口
router.post('/manLogin', async ctx => {
  let ManageUser = mongoose.model('ManageUser')
  let reqData = ctx.request.body
  await ManageUser.findOne({userName: reqData.userName}).then(res => {
    console.log(res)
    // 如果用户名不存在，那么res为null
    if (res) {
      // 判断账号是否是激活状态
      if (!res.isActive) {
        return ctx.body = {
          code: 0,
          data: '账户被禁用，请联系管理员'
        }
      }
      // 判断密码是否正确
      if (res.password === reqData.password) {
        ctx.body = {
          code: 1,
          data: {
            createAt: res.createAt,
            userName: res.userName,
            role: res.role,
            isActive: res.isActive
          }
        }
      } else {
        ctx.body = {
          code: 0,
          data: '密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 0,
        data: '用户名不存在'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 0,
      data: '登录失败，请稍后再试',
      msg: err
    }
  })
})

module.exports = router