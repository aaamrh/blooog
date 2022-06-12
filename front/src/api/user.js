/** 
 * 封装用户接口
*/

const { default: Request } = require("../utils/request")

class Api extends Request {
  login (params) {
    return this.request({
      ...params,
      url: '/user/login',
      method: 'post'
    })
  }

  isAuth () {
    return this.request({
      url: '/user/verify',
      method: 'post'
    })
  }
}

const UserApi = new Api()

export default UserApi