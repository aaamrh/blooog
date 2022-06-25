/**
 * 保存系统错误码和信息
 */

module.exports = {
  loginErr: {
    code: 10001,
    message: '登录失败, 用户名或验证码错误'
  },
  codeErrFrequently: {
    code: 10004,
    message: '验证码获取太频繁, 请5分钟后再试'
  },
  getCodeFrequently: {
    code: 10005,
    message: '频繁获取验证码'
  },
  getCodeFailInfo: {
    code: 10006,
    message: '验证码获取失败, 请重试'
  },
  codeExpired: {
    code: 10007,
    message: '验证码已过期, 请重新获取验证码'
  },
  tokenExpired: {
    code: 10008,
    message: '用户身份无效'
  },
  publishArticleFailInfo: {
    code: 10102,
    message: '创建文章失败，请重试'
  },
  getArticleFailInfo: {
    code: 10101,
    message: '查找文章失败，请重试'
  },
  getClassifyListFailInfo: {
    code: 10201,
    message: '查找分类列表失败，请重试'
  },
  getClassifyFailInfo: {
    code: 10202,
    message: '查找分类失败，请重试'
  },
  getArticleListFailInfo: {
    code: 10205,
    message: '查找文章列表失败，请重试'
  },
  updateArticleListFailInfo: {
    code: 10103,
    message: '文章更新失败，请重试'
  },
}

/** 
 * 10000 用户相关
 * 10001 登录失败, 用户名或验证码错误
 * 10002 注册失败
 * 10003 身份过期
 * 10004 验证码错误次数超过5次, 请重新获取验证码
 * 10005 频繁获取验证码
 * 10006 获取验证码失败
 * 10007 验证码已过期, 请重新获取验证码
 * 10008 用户身份无效
 * 
 * 
 * 10100 文章相关
 * 10101 文章查找失败
 * 10102 文章创建失败
 * 10103 文章更新失败
 * 10104 文章删除失败
 * 10105 文章列表查询失败
 * 
 * 
 * 10200 分类相关
 * 10201 查找分类列表失败
 * 10201 查找分类失败
 * 
*/