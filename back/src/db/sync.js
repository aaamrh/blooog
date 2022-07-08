const seq = require('./seq')
require('./model/index')
console.log(require('./model/index'))

// 测试链接
seq.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch(() => {
  console.log('数据库连接失败')
})

// 同步数据库
seq.sync({ force: true }).then(() => {
  process.exit()
})