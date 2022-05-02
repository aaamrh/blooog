const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const Classify = seq.define('classify', {
  type: {
    type: STRING,
    allowNull: false,
    comment: '分类类型'
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: '分类类型文字展示'
  },
  parentId: {
    type: INTEGER,
    default: 0,
    allowNull: false,
    comment: '父分类id'
  },
}, {
  timestamps: false
})

module.exports = Classify