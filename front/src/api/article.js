const { default: Request } = require("../utils/request");

class Api extends Request {
  saveArticle(params){
    return this.request({
      ...params,
      url: '/article',
      method: 'post'
    })
  }
}

const ArticleApi = new Api()

export default ArticleApi