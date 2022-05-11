const { default: Request } = require("../utils/request");

class Api extends Request {
  saveArticle(params){
    return this.request({
      ...params,
      url: '/article',
      method: 'post'
    })
  }

  /**
   * 获取文章列表
   * @param {*} params.data
   * @param {*} params.data.id 分类id
   * @param {*} params.data.type 分类type
   * @param {*} params.data.parentId 分类parentId
   * @param {*} params.data.classifyId 文章的classifyId
   * @returns 
   */
  getArticles(params){
    return this.request({
      ...params,
      url: '/article',
      method: 'get'
    })
  }
}

const ArticleApi = new Api()

export default ArticleApi