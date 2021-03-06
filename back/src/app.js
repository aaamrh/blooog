const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
require('dotenv').config();

// console.log(process.env)  

const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const classifyApiRouter = require('./routes/classify')
const articleAPIRouter = require('./routes/article')
const userAPIRouter = require('./routes/user')
const captchaAPIRouter = require('./routes/captcha')
// error handler 页面上显示错误
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json()) // bodyparser解析完json是string, json()是转换成对象
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', { extension: 'pug' }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'blooog.sid', // cookie name 默认是 `koa.sid`
    prefix: 'blooog:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 单位 ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(classifyApiRouter.routes(), classifyApiRouter.allowedMethods())
app.use(articleAPIRouter.routes(), articleAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(captchaAPIRouter.routes(), captchaAPIRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
