const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'haha'
})

router.get('/phone', async (ctx, next) => {
  ctx.body = 'haha'
})


module.exports = router
