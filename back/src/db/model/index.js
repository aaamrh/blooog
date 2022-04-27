const Article = require('./Article')
const User = require('./User')
const Classify = require('./Classify')

Article.belongsTo(User, {
  foreignKey: 'userId'
})

Classify.belongsTo(Article, {
  foreignKey: 'articleId'
})

module.exports = {
  Article,
  User,
  Classify
}