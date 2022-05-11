const { Article, Classify } = require('../db/model')

async function createArticle ({ title, content, text, classifyId, userId }) {
  console.log(title, content)
  const result = await Article.create({
    userId,
    title,
    content,
    text,
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


/**
 * 查找文章列表的几种形式
 * 1. 首页: 无需传参
 * 2. 二级分类: 分类id 或者 分类type
 */
/**
 * 通过分类id获取文章列表,  如果不传id则直接获取文章列表
 * @param {*} classifyId 
 */
async function selectArticleList (classifyId) {
  let _where = {}
  if (classifyId) { _where.classifyId = classifyId }

  const result = await Article.findAndCountAll({
    where: { ..._where },
  })

  let articles = result.rows.map(row => row.dataValues)
  return {
    count: result.count,
    articles
  }
}

/**
 * 获取文章列表: 传入 通过二级分类id 或者 type
 */
async function selectArticleListByClassify (params) {
  const result = await Article.findAndCountAll({
    include: [
      {
        model: Classify,
        where: { ...params }
      }
    ]
  })
  let articles = result.rows.map(row => row.dataValues)
  return {
    count: result.count,
    articles
  }
}

module.exports = {
  createArticle,
  selectArticle,
  selectArticleList,
  selectArticleListByClassify
}