const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI5tSe48uYxDr25LFrj23Z',
  accessKeySecret: 'Nsr9LcdeufoHadfnJQntLKuivbez8o',
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var params = {
  "PhoneNumbers": "17615004096",
  "SignName": "铁头的梦想",
  "TemplateCode": "SMS_236565464",
  "TemplateParam": "{code: 123456}"
}

var requestOption = {
  method: 'POST',
  formatParams: false
};

client.request('SendSms', params, requestOption).then((result) => {
  console.log(JSON.stringify(result));
}, (ex) => {
  console.log(ex);
})