/** 
 * 验证码接口
*/

const { default: Request } = require("./request")

class Api extends Request {
  getCaptcha (params) {
    return this.request({
      ...params,
      url: '/captcha',
      method: 'post'
    })
  } 
} 

const CaptchaApi = new Api()

export default CaptchaApi