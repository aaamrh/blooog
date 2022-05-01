const { createArticle, selectArticle } = require("../services/article")
const { SuccessModel, ErrorModel } = require("../utils/resModel")
const { publishArticleFailInfo, getArticleFailInfo } = require("../utils/errorInfo")

/**
 * 发布文章
 * @param {*} ctx 
 * @param {标题, 内容, 分类id} param1 
 */
async function publishArticle (ctx, { title, content, classifyId }) {
  // TODO const { id: userId = 1 } = ctx.session
  try {
    const article = await createArticle({ userId: 1, title, content, classifyId })
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
  getArticleInfo
}