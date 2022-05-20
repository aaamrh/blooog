const Core = require('@alicloud/pop-core');
const { rset } = require('../cache/_redis');
const { genCodeNumber } = require('./index')

const client = new Core({
  accessKeyId: process.env.ALI_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

const code = genCodeNumber(4)
rset('login-captcha', code, 5 * 60)

const params = {
  "PhoneNumbers": "17615004096",
  "SignName": "铁头的梦想",
  "TemplateCode": "SMS_236565464",
  "TemplateParam": code
}

const requestOption = {
  method: 'POST',
  formatParams: false
};

client.request('SendSms', params, requestOption).then((result) => {
  console.log(JSON.stringify(result));
}, (ex) => {
  console.log(ex);
})