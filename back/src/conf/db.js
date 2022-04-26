const { isProd } = require('../utils/env')

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'ma.1996',
  database: 'blooog',
  port: 3306
}

if (isProd) {
  MYSQL_CONF = {
    user: 'root',
    password: 'ma.1996',
    database: 'blooog',
    host: 'localhost',
    port: 3306
  }
}

module.exports = {
  MYSQL_CONF
}
