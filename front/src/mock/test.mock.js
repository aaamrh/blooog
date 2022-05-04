import Mock from 'mockjs';

Mock.mock('/api/articles', 'get', {
  code: 0,
  message: '获取文章列表成功！',
  'data|7': [
    {
      id: '@increment(1)',      // 自增的Id值
      read: '@natural(100, 999)',
      title: '@ctitle(6,12)',
      content: '@csentence(10,150)',
      time: '2022-02-11 11.44',
      _id: '@natural(100000000, 999999999)'
    }
  ]
})


Mock.mock('/api/articles/more', 'get', {
  code: 0,
  message: '获取文章列表成功！',
  'data|7': [
    {
      id: '@increment(1)',      // 自增的Id值
      read: '@natural(100, 999)',
      title: '@ctitle(6,12)',
      content: '@csentence(10,150)',
      time: '2022-02-11 11.44',
      _id: '@natural(100000000, 999999999)'
    }
  ]
})


Mock.mock('/api/articles/:id', 'get', {
  code: 0,
  message: '获取文章详情成功！',
  data: {
    id: '@increment(1)',      // 自增的Id值
    title: '@ctitle(6,12)',
    content: '<p><span style="background-color: rgb(140, 140, 140);">11123</span></p><p><br></p><ul><li></li></ul>',
    time: '2022-02-11 11.44',
    _id: '@natural(100000000, 999999999)'
  }
})



/** 
 * user
 *    id
 *    name 
 *    
 * 
*/