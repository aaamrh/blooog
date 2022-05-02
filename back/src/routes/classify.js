const router = require('koa-router')()

const { getClassifyList } = require('../controller/classify')
const { Classify } = require("../db/model")


router.prefix('/api/classify')

router.get('/', async (ctx, next) => {
  const result = await getClassifyList()

  ctx.body = result
})

module.exports = router
