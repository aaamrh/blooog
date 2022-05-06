const router = require('koa-router')()

const { getClassifyList } = require('../controller/classify')
const { Classify } = require("../db/model")
const { classify } = require('../utils/layout')

router.prefix('/api/classify')

router.get('/', async (ctx, next) => {
  const result = await getClassifyList()

  ctx.body = result
})

router.get('/init', async (ctx, next) => {
  classify.forEach(item => {
    Classify.create({
      id: item.id,
      type: item.value,
      name: item.title,
      parentId: item.pid
    })
  })
})


module.exports = router
