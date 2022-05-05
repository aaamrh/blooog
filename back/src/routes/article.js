const router = require('koa-router')()

router.prefix('/api/articles')

router.get('/:articleId', async (ctx, next) => {
  console.log('获取文章信息')
  ctx.body = {
    code: 0,
    message: '获取文章信息'
  }
})

router.get('/', (ctx, next) => {
  
  console.log(ctx.query)
  console.log(ctx.querystring)

  ctx.body = {
    code: 0
  }
})

router.post('/', (ctx, next) => {
  
  console.log(ctx.body)
  console.log(ctx.request.body)

  ctx.body = {
    code: 0
  }
})



module.exports = router