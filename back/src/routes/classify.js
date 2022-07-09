const router = require('koa-router')()
const { getClassifyList, getClassify } = require('../controller/classify')

router.prefix('/api/classify')

router.get('/', async (ctx, next) => {
  const result = await getClassifyList()

  ctx.body = result
})

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params
  const result = await getClassify(id)

  ctx.body = result
})


module.exports = router
