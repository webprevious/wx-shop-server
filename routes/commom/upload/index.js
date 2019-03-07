const router = require('koa-router')()
let crypto = require('crypto')

function sign(key, secret, method, uri, date, policy) {
    let elems = []
    ;[method, uri, date, policy].forEach(item => {
        if (item != null) {
            elems.push(item)
        }
    })
    value = elems.join('&')
    auth = hmacsha1(secret, value)
    return `UPYUN ${key}:${auth}`
}
function MD5(value) {
    return crypto.createHash('md5').update(value).digest('hex')
}
function hmacsha1(secret, value) {
    return crypto.createHmac('sha1', secret).update(value, 'utf-8').digest().toString('base64')
}

// 计算出秘要
function getKey () {
  let date = new Date().toGMTString()
  let key = 'upyun'
  let secret = '12345678.'
  let method = 'POST'
  let uri = '/shopdev'
  let expiration = Math.ceil((+new Date() + 1800000) / 1000)
  let obj = {
    "bucket": "shopdev",
    "save-key": "{filename}{.suffix}",
    "expiration": expiration,
    "date": date
  }
  let policy = new Buffer(JSON.stringify(obj)).toString('base64')
  let authorization = sign(key, MD5(secret), method, uri, date, policy)
  return {
    policy,
    authorization
  }
}

router.get('/getUpyun', async (ctx, next) => {
  ctx.body = {
    code: 1,
    data: getKey()
  }
})

module.exports = router