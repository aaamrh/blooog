const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequelize('blooog', 'root', 'ma.1996', conf)

module.exports = seq
