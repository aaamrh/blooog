const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

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
    comment: '文章内容-html格式'
  },
  text: {
    type: TEXT,
    allowNull: false,
    comment: '文章内容的纯文本'
  },
  read: {
    type: INTEGER,
    defaultValue: 0,
    comment: '阅读数'
  }
})

module.exports = Article