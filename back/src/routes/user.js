const router = require('koa-router')()

const { rget, rset, rttl } = require('../cache/_redis')
const { throttle, isAuth } = require('../middlewares')
const { loginErr, codeExpired } = require('../utils/errorInfo')
const { SuccessModel, ErrorModel } = require('../utils/resModel')
const { sign, decode, verify } = require('jsonwebtoken');

router.prefix('/api/user')

router.post('/verify', isAuth, async (ctx, next) => {
  ctx.body = new SuccessModel()
})
  
router.post('/login', throttle, async (ctx, next) => {
  const { phone, captcha } = ctx.request.body

  if (!await rget('login-captcha')) {
    return ctx.body = new ErrorModel(codeExpired)
  }

  if (phone !== process.env.PHONE && captcha !== await rget('login-captcha')) {
    return ctx.body = new ErrorModel(loginErr)
  }

  const jwt = sign({ phone }, process.env.SECRET, { expiresIn: '7 days' })

  return ctx.body = new SuccessModel({
    token: jwt
  })
})

module.exports = router