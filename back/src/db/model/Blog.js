const seq = require('../seq')
const { INTEGER } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  read: {
    type: INTEGER,
  }
})

module.exports = Blog