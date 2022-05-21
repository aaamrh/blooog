/**
 * 保存系统错误码和信息
 */

module.exports = {
  getCodeFrequently: {
    code: 10005,
    message: '验证码获取太频繁, 请5分钟后再试'
  },
  getCodeFailInfo: {
    code: 10006,
    message: '验证码获取失败, 请重试'
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
 * 10001 登录失败, 用户名或密码错误
 * 10002 注册失败
 * 10003 身份过期
 * 10004 验证码错误
 * 10005 频繁获取验证码
 * 10006 获取验证码失败
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
 * 
*/