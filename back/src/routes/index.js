const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const { rset, rget } = require('../cache/_redis');
const { Classify, User } = require("../db/model")
const { classify } = require('../utils/layout')

router.post('/__init__', async (ctx, next) => {
  classify.forEach(item => {
    Classify.create({
      id: item.id,
      type: item.value,
      name: item.title,
      parentId: item.pid
    })
  })
  User.create({
    id: 1,
    phone: process.env.PHONE,
    uname: '山海行',
  })

  ctx.body = 0
})

router.get('/test', async (ctx, next) => {
  let tk = await rget('jwt')
  
  if (!tk) {
    tk = jwt.sign({ name: 'haha' }, process.env.SECRET, { expiresIn: 5 })
    await rset('jwt', tk)
  }

  const res = jwt.verify(tk, process.env.SECRET)               

  ctx.body = {
    tk,
    decode: jwt.decode(tk),
    res
  }
})


module.exports = router
