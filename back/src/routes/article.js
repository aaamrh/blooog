const router = require('koa-router')()

const { publishArticle, getArticleInfo, getArticleList, getArticleListByClassify } = require('../controller/article')
const { Article, Classify } = require('../db/model')

router.prefix('/api/article')

// 获取文章列表
router.get('/', async (ctx, next) => {
  let { classifyId, type } = ctx.query
  console.log(type, 'type', ctx.query)
  // controller
  ctx.body = await getArticleListByClassify({
    type
  })

})

// 获取文章详情
router.get('/:articleId', async (ctx, next) => {
  let { articleId } = ctx.params
  ctx.body = await getArticleInfo(articleId)
})

// 发布文章
router.post('/', async (ctx, next) => {
  const { title, content, text, firstCId, secondCId } = ctx.request.body

  ctx.body = await publishArticle(ctx, {
    title,
    content,
    text,
    classifyId: secondCId ?? firstCId
  })
})

module.exports = router