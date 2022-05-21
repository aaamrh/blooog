const Core = require('@alicloud/pop-core')
const { rset } = require('../cache/_redis')
const utils = require('./index')

const client = new Core({
  accessKeyId: process.env.ALI_ACCESSKEY_ID,
  accessKeySecret: process.env.ALI_ACCESSKEY_SECRET,
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

const requestOption = {
  method: 'POST',
  formatParams: false
}

module.exports = (phone) => {
  const code = utils.genCodeNumber(4)
  rset('login-captcha', code, 5 * 60)

  const params = {
    PhoneNumbers: '17615004096', // TODO 暂时只能自己登录, 所以只能给自己发短信
    SignName: '铁头的梦想',
    TemplateCode: 'SMS_236565464',
    TemplateParam: JSON.stringify({ code })
  }

  return client.request('SendSms', params, requestOption)
}

// client.request('SendSms', params, requestOption).then((result) => {
//   console.log(JSON.stringify(result));
// }, (ex) => {
//   console.log(ex);
// })ee