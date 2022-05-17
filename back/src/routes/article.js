const router = require('koa-router')()

const { publishArticle, getArticleInfo, getArticleList, getArticleListByClassify, modifyArticle } = require('../controller/article')

router.prefix('/api/article')

// 获取文章详情
router.get('/:articleId', async (ctx, next) => {
  let { articleId } = ctx.params
  ctx.body = await getArticleInfo(articleId)
})

// 获取文章详情列表
router.get('/', async (ctx, next) => {
  let params = {};
  let {
    classifyId, type='', id, name='',
    page = "{ cursor: 0, limit: 10, keywords: '' }" // get方法传递的对象是字符串
  } = ctx.query
  
  type && (params.type = type)       
  id && (params.id = id)
  console.log(type)
  if ((type && type !== 'all') || name) {
    ctx.body = await getArticleListByClassify(params, JSON.parse(page))
  } else {
    ctx.body = await getArticleList(params, JSON.parse(page))
  }
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

// 修改文章
router.patch('/', async (ctx, next) => {
  const { id, title, content, text, firstCId, secondCId } = ctx.request.body

  ctx.body = await modifyArticle(ctx, {
    id,
    title,
    content,
    text,
    classifyId: secondCId ?? firstCId
  })
})

module.exports = router