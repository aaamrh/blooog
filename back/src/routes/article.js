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
  const { title, content, firstCId, secondCId } = ctx.request.body

  ctx.body = await publishArticle(ctx, {
    title,
    content,
    classifyId: secondCId ?? firstCId
  })
})

module.exports = router