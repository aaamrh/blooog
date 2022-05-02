const router = require('koa-router')()

const { publishArticle, getArticleInfo } = require('../controller/article')
const { Article, Classify } = require('../db/model')
const { classify } = require('../utils/layout')

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

router.post('/init', async (ctx, next) => {
  classify.forEach(item => {
    Classify.create({
      type: item.value,
      name: item.title,
      parentId: item.pid
    })
  })
})

module.exports = router