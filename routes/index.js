const router = require('koa-router')()

router.get('/test', async (ctx, next) => {
  ctx.body = {
    code: 1,
    data: {
      name: 'lisi',
      age: 18
    }
  }
})

module.exports = router
