const { default: Request } = require("./request");

class Api extends Request {
  publishArticle(args){
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

  /**
   * 获取文章列表
   * @param {*} args.params
   * @param {*} args.params.id 分类id
   * @param {*} args.params.type 分类type
   * @param {*} args.params.parentId 分类parentId
   * @param {*} args.params.classifyId 文章的classifyId
   * @returns 
   */
   getArticle(args){
    return this.request({
      ...args,
      url: `/article/${args.id}`,
      method: 'get'
    })
  }

  /**
   * 修改文章列表
   * @param {*} args.params
   * @param {*} args.params.id 分类id
   * @param {*} args.params.type 分类type
   * @param {*} args.params.parentId 分类parentId
   * @param {*} args.params.classifyId 文章的classifyId
   * @returns 
   */
   modifyArticles(args){
    return this.request({
      ...args,
      url: '/article',
      method: 'patch'
    })
  }
}

const ArticleApi = new Api()

export default ArticleApi