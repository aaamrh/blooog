const router = require('koa-router')()

const { publishArticle } = require('../controller/article')
const { Article } = require('../db/model')

router.prefix('/api/article')

router.get('/:articleId', async (ctx, next) => {
  let { articleId } = ctx.params
  
  ctx.body = {
    code: 0,
    articleId
  }
})

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body, ctx.request.header)

  const result = await publishArticle(ctx, {
    title: 'this is title',
    content: '123123',
    classifyId: 1,
  })

  ctx.body = {
    code: 0,
    res: result.dataValues
  }
})

module.exports = router