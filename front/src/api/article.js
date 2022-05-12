const { default: Request } = require("../utils/request");

class Api extends Request {
  saveArticle(args){
    return this.request({
      ...args,
      url: '/article',
      method: 'post'
    })
  }

  /**
   * 获取文章列表
   * @param {*} args.params
   * @param {*} args.params.id 分类id
   * @param {*} args.params.type 分类type
   * @param {*} args.params.parentId 分类parentId
   * @param {*} args.params.classifyId 文章的classifyId
   * @returns 
   */
  getArticles(args){
    return this.request({
      ...args,
      url: '/article',
      method: 'get'
    })
  }
}

const ArticleApi = new Api()

export default ArticleApi