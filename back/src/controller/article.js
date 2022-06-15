const { SuccessModel, ErrorModel } = require("../utils/resModel")
const {
  createArticle, 
  selectArticle,
  selectArticleList,
  selectArticleListByClassify,
  updateArticle
} = require("../services/article")
const {
  publishArticleFailInfo,
  getArticleFailInfo,
  getArticleListFailInfo,
  updateArticleListFailInfo
} = require("../utils/errorInfo")

// 获取文章列表
async function getArticleList (args, page) {
  console.log('args', args)
  try {
    const articles = await selectArticleList(args, page)
    return new SuccessModel(articles)
  } catch (e) {
    return new ErrorModel(getArticleListFailInfo)
  }
}

/**
 * 通过分类连表查询
 * @param {number} params.id
 * @param {string} params.name
 * @param {string} params.type
 * @param {number} params.parentId
 */
async function getArticleListByClassify (args, page) {
  try {
    const articles = await selectArticleListByClassify(args, page)
    return new SuccessModel(articles)
  } catch (e) {
    return new ErrorModel(getArticleListFailInfo)
  }
}

/**
 * 发布文章
 * @param {*} ctx 
 * @param {标题, 内容, 分类id} param1 
 */
async function publishArticle (ctx, { title, content, text, classifyId }) {
  // TODO const { id: userId = 1 } = ctx.session
  console.log(title, content, text, classifyId)
  try {
    const article = await createArticle({ userId: 1, title, content, text, classifyId })
    return new SuccessModel(article)
  } catch (e) {
    console.log('publishArticle', e)
    return new ErrorModel(publishArticleFailInfo)
  }
}

/**
 * 根据文章id获取文章详情
 * @param {文章id} articleId 
 * @returns 
 */ 
async function getArticleInfo (articleId) {
  try {
    const article = await selectArticle(articleId)
    return new SuccessModel(article)
  } catch (e) {
    console.log('getArticleInfo', e)
    return new ErrorModel(getArticleFailInfo)
  }
}

/**
 * 修改文章
 * @param {文章id} articleId 
 * @returns 
 */ 
async function modifyArticle (ctx, { id, title, content, text, classifyId }) {
  try {
    const affectedRows = await updateArticle({ id, userId: 1, title, content, text, classifyId }) // 0 | 1 
    
    if (affectedRows) { return new SuccessModel(article) }
    return new ErrorModel(updateArticleListFailInfo)
  } catch (e) {
    return new ErrorModel(updateArticleListFailInfo)
  }
}

module.exports = {
  publishArticle,
  getArticleInfo,
  getArticleList,
  getArticleListByClassify,
  modifyArticle
}