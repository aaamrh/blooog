const router = require('koa-router')()

<<<<<<< HEAD
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

=======
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



>>>>>>> dev
module.exports = router