const router = require('koa-router')()

const { publishArticle, getArticleInfo } = require('../controller/article')
const { Article, Classify } = require('../db/model')

router.prefix('/api/article')

router.get('/:articleId', async (ctx, next) => {
  let { articleId } = ctx.params
  ctx.body = await getArticleInfo(articleId)
})

// 发布文章
router.post('/', async (ctx, next) => {
  console.log(ctx.request.body, ctx.request.header)

  ctx.body = await publishArticle(ctx, {
    title: 'this is title',
    content: '123123',
    classifyId: 1,
  })
})

module.exports = router