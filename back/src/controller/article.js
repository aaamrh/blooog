const { createArticle } = require("../services/article")
const { SuccessModel } = require("../utils/resModel")

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
    return new ErrorModel({})
  }

  console.log(result, 'publishArticle')



}

module.exports = {
  publishArticle
}