const router = require('koa-router')()
const mongoose = require('mongoose')

// 注册登录共用
// update方法支持如果没有满足条件的就会直接插入一条记录
router.post('/register', async (ctx, next) => {
  let reqData = ctx.request.body
  // 获取modle
  const User = mongoose.model('User')
  await User.update({ nickName: reqData.nickName }, reqData, { upsert: true }).then((res) => {
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

// 注册登录成功后获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  // 获取modle
  const User = mongoose.model('User')
  await User.findOne({ nickName: ctx.query.nickName }).then((res) => {
    // 如果查到了用户就视为成功
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
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

// 签到
router.post('/signed', async (ctx, next) => {
  const Signed = mongoose.model('Signed')
  const reqData = ctx.request.body
  await Signed.find({userId: reqData.userId}).then(async res => {
    // 如果用户存在，直接签到次数+1
    if (res.length) {
      res[0].times++
      res[0].todayIsSigned = true
      await res[0].save().then(res => {
        ctx.body = {
          code: 1,
          data: '签到成功'
        }
      }).catch(err => {
        ctx.body = {
          code: 0,
          data: '签到失败'
        }
      })
    } else {
      // 不存在说明用户第一次签到
      await Signed.create(reqData).then(res => {
        ctx.body = {
          code: 1,
          data: '签到成功'
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

// 判断当天是否已经签到
router.get('/isSignedToday', async (ctx, next) => {
  const Signed = mongoose.model('Signed')
  await Signed.find({userId: ctx.query.userId}).then(async res => {
    if (res.length) {
      ctx.body = {
        code: 1,
        data: res[0]
      }
    } else {
      ctx.body = {
        code: 0,
        data: err
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 0,
      data: err
    }
  })
})

module.exports = router