const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isTest, isProd } = require('../utils/env')

const {
  user,
  password,
  host,
  port,
  database
} = MYSQL_CONF
console.log('MYSQL_CONF', MYSQL_CONF)

const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000 // 如果一个连接池 10s 没有使用, 则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
