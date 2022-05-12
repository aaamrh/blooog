const { createArticle, selectArticle, selectArticleList, selectArticleListByClassify } = require("../services/article")
const { SuccessModel, ErrorModel } = require("../utils/resModel")
const { publishArticleFailInfo, getArticleFailInfo, getArticleListFailInfo } = require("../utils/errorInfo")

// 获取文章列表
async function getArticleList (args) {
  console.log('args', args)
  try {
    const articles = await selectArticleList(args)
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
async function getArticleListByClassify (params) {
  try {
    const articles = await selectArticleListByClassify(params)
    console.log(articles)
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
  try {
    const article = await createArticle({ userId: 1, title, content, text, classifyId })
    return new SuccessModel(article)
  } catch (e) {
    console.log('publishArticle', e)
    return new ErrorModel(publishArticleFailInfo)
  }
}

/**
 * 
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


module.exports = {
  publishArticle,
  getArticleInfo,
  getArticleList,
  getArticleListByClassify
}