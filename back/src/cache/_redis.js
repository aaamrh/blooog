const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')


// const redisClient = redis.createClient()
const redisClient = redis.createClient({
  socket: {
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
  },
  legacyMode: true,
})

redisClient.on('error', err => {
  console.error('redis error', err)
})

async function connect() {
  await redisClient.connect();

  const value = await redisClient.get('name')
}

connect()

async function rset (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  await redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

async function rget (key) {
  const value = await redisClient.get(key)
  console.log('value', value)
  return value
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

rset('name1', '3333')
rget('name1')

module.exports = {
  rset,
  rget
}