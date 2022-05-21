const router = require('koa-router')()

const { rget, rset } = require('../cache/_redis')
const code = require('../utils/code')

router.prefix('/api/user')

router.get('/set', async (ctx, next) => {
  let captcha = await rget('login-captcha')
  
  if (captcha) {
    ctx.body = '验证码已发送, 5分钟后再试'
    return
  }

  ctx.body = await code()
})

router.get('/get',  async (ctx, next) => {
  ctx.body = await rget('login-captcha')
})

module.exports = router