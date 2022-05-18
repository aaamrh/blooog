const { isProd } = require('../utils/env')

let MYSQL_CONF = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: 'blooog',
  port: 3306
}

if (isProd) {
  MYSQL_CONF = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'blooog',
    host: 'localhost' ,
    port: 3306
  }
}

module.exports = {
  MYSQL_CONF
}
