const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient({
  socket: {
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
  },
  // legacyMode: true,
})

redisClient.on('error', err => {
  console.error('redis error', err)
})

;(async () => {
  await redisClient.connect();
})();


async function rset (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  await redisClient.set(key, val)
  await redisClient.expire(key, timeout)
}

async function rget (key) {
  const value = await redisClient.get(key)
  return value
}

module.exports = {
  rset,
  rget
}
