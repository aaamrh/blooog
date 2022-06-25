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
      { model: Classify }
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
async function selectArticleList ({ type, id, userId, title, classifyId }, { cursor = 0, limit = 10, keywords='' }) {
  let _where = {}
  if (id) { _where.id = id }
  // if (type) { _where.type = type }
  if (userId) { _where.userId = userId }
  if (title) { _where.title = title }
  if (classifyId) { _where.classifyId = classifyId }

  console.log('where', _where)
  const result = await Article.findAndCountAll({
    limit,
    offset: cursor * limit,
    where: _where,
  })

  let articles = result.rows.map(row => row.dataValues)
  return {
    count: articles.length,
    total: result.count,
    totalPage: Math.ceil( result.count / limit ),
    articles
  }
}

/**
 * 获取文章列表: 传入 通过二级分类id 或者 type
 */
async function selectArticleListByClassify (args, { cursor = 0, limit = 10, keywords='' }) {
  const result = await Article.findAndCountAll({
    limit,
    offset: cursor * limit,
    include: [
      {
        model: Classify,
        where: args
      }
    ]
  })
  let articles = result.rows.map(row => row.dataValues)
  return {
    count: articles.length,
    total: result.count,
    totalPage: Math.ceil( result.count / 3 ),
    articles
  }
}

/**
 * 更新文章
 * @param {*}  id, title, content, text, classifyId, userId
 * @returns 0 | 1
 */
async function updateArticle ({ id, title, content, text, classifyId, userId }) {
  const result = await Article.update({
    title,
    content,
    text,
    classifyId
  }, {
    where: {
      id,
      userId
    }
  })

  return result[0]
}

module.exports = {
  createArticle,
  selectArticle,
  selectArticleList,
  selectArticleListByClassify,
  updateArticle
}