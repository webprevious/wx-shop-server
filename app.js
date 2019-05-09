const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const {mongodb} = require('./mongo')

// 引入客户端微信小程序路由
const wxUser = require('./routes/wxcustom/user/index')
const wxCarousel = require('./routes/wxcustom/adcarousel/index')
const wxCategory = require('./routes/wxcustom/goodscategory/index')
const wxPublishGoods = require('./routes/wxcustom/publishgoods/index')
const wxGoodsStore = require('./routes/wxcustom/goodsstore/index')
const wxGoodsBBS = require('./routes/wxcustom/goodsbbs/index')

// 引入管理端路由
const manCarousel = require('./routes/manage/adcarousel/index')
const manCategory = require('./routes/manage/goodscategory/index')
const manVerifyGoods = require('./routes/manage/goodsverify/index')
const manUser = require('./routes/manage/usermanage/index')
const manLogin = require('./routes/manage/login/index')

// 引入公共路由
const uploadFile = require('./routes/commom/upload/index')

// 绑定错误处理
onerror(app)

// 数据库连接
mongodb()

// 跨域
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 注册微信小程序端路由
app.use(wxUser.routes(), wxUser.allowedMethods())
app.use(wxCarousel.routes(), wxCarousel.allowedMethods())
app.use(wxCategory.routes(), wxCategory.allowedMethods())
app.use(wxPublishGoods.routes(), wxPublishGoods.allowedMethods())
app.use(wxGoodsStore.routes(), wxGoodsStore.allowedMethods())
app.use(wxGoodsBBS.routes(), wxGoodsBBS.allowedMethods())

// 注册管理端路由
app.use(manCarousel.routes(), manCarousel.allowedMethods())
app.use(manCategory.routes(), manCategory.allowedMethods())
app.use(manVerifyGoods.routes(), manVerifyGoods.allowedMethods())
app.use(manUser.routes(), manUser.allowedMethods())
app.use(manLogin.routes(), manLogin.allowedMethods())

// 注册公共路由
app.use(uploadFile.routes(), uploadFile.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
