const { Article, Classify } = require('../db/model')

async function createArticle ({ title, content, classifyId, userId }) {
  const result = await Article.create({
    userId,
    title,
    content,
    classifyId
  })

  return result.dataValues
}

async function selectArticle (id) {
  const result = await Article.findOne({
    where: { id },
    include: [
      {
        model: Classify
      }
    ]
  })
  return result.dataValues
}

module.exports = {
  createArticle,
  selectArticle
}