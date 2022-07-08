const seq = require('../seq')
const { STRING } = require('../types')

const User = seq.define('user', {
  phone: {
    type: STRING(11),
    allowNull: false
  },
  uname: {
    type: STRING(20),
    allowNull: false
  }
})

module.exports = User