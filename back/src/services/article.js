const { Article } = require('../db/model')

async function createArticle ({ title, content, classifyId, userId }) {
  const result = await Article.create({
    userId,
    title,
    content,
    classifyId
  })

  return result.dataValues
}

module.exports = {
  createArticle
}