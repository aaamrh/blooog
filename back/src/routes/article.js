const router = require('koa-router')()

const { publishArticle, getArticleInfo, getArticleList, getArticleListByClassify } = require('../controller/article')
const { Article, Classify } = require('../db/model')

router.prefix('/api/article')

// 获取文章列表
router.get('/', async (ctx, next) => {
  let { classifyId, type, id } = ctx.query
  console.log('type', ctx.query, id)
  // controller
  let params = {};

  type && (params.type = type)       
  id && (params.id = id)
  console.log('params', params)

  ctx.body = await getArticleList(params)
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