const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const { rset, rget } = require('../cache/_redis');

router.get('/', async (ctx, next) => {
  ctx.body = 'haha'
})

router.get('/test', async (ctx, next) => {
  let tk = await rget('jwt')
  
  if (!tk) {
    tk = jwt.sign({ name: 'haha' }, process.env.SECRET, { expiresIn: 5 })
    await rset('jwt', tk)
  }

  const res = jwt.verify(tk, process.env.SECRET)               

  ctx.body = {
    tk,
    decode: jwt.decode(tk),
    res
  }
})


module.exports = router
