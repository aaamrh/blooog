const Article = require('./Article')
const User = require('./User')
const Classify = require('./Classify')

Article.belongsTo(User, {
  foreignKey: 'userId'
})

Article.belongsTo(Classify, {
  foreignKey: 'classifyId'
})

module.exports = {
  Article,
  User,
  Classify
}