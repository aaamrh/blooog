const seq = require('../seq')
const { INTEGER, STRING } = require('../types')

const Article = seq.define('article', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  title: {
    type: STRING(25),
    allowNull: false,
    comment: '标题'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  read: {
    type: INTEGER,
    defaultValue: 0,
    comment: '阅读数'
  }
})

module.exports = Article