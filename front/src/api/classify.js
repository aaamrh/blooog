/** 
 * 封装分类接口
*/

const { default: Request } = require("../utils/request")

class Api extends Request {
  getClassify (params) {
    return this.request({
      ...params,
      url: '/classify',
      method: 'get'
    })
  }

  addClassify (params) {
    return this.request({
      ...params,
      url: '',
      method: 'post'
    })
  }
}

const ClassifyApi = new Api()

export default ClassifyApi