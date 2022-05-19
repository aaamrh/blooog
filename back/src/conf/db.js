const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: 'blooog',
  port: 3306
}

console.log(process.env.DB_USER)

if (isProd) {
  MYSQL_CONF = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'blooog',
    host: 'localhost' ,
    port: 3306
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
