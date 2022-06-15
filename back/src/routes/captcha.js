const router = require('koa-router')()

const { rget, rset } = require('../cache/_redis')
const code = require('../utils/code')

router.prefix('/api/captcha')

router.post('/', async (ctx, next) => {
  let captcha = await rget('login-captcha')
  
  if (captcha) {
    ctx.body = '验证码已发送, 5分钟后再试'
    return
  }

  const [cd, res] = await code()

  if (res.Code === 'OK') {
    await rset('login-captcha', cd, 1 * 60) // 
  }

  ctx.body = res
})
 
// router.post('/get',  async (ctx, next) => {
//   ctx.body = await rget('login-captcha')
// })
  
module.exports = router