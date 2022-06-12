const { verify } = require("jsonwebtoken");
const { rset, rget, rttl } = require("../cache/_redis");
const { codeErrFrequently, tokenExpired } = require("../utils/errorInfo");
const { ErrorModel } = require("../utils/resModel");

async function throttle(ctx, next) {
  const key = `api-${ctx.request.url}-${ctx.request.method}`
  const times = await rget(key)
  
  if (!times) {
    await rset(`api-${ctx.request.url}-${ctx.request.method}`, 1, 1 * 60);
    await next();
    return ;
  }

  if (times >= 5) {
    return ctx.body = new ErrorModel(codeErrFrequently)
  }
  await rset(key, +times + 1, await rttl(key));
  await next()
}

async function isAuth (ctx, next) {
  const token = ctx.request.header.authorization
  if (!token) {
    return ctx.body = new ErrorModel(tokenExpired)
  }

  verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return ctx.body = new ErrorModel(tokenExpired)
    }
  })

  await next()
}

module.exports = { throttle, isAuth };
