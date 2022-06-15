// 获取url参数
function getQuery (str) {
  const queryArr = str.split('?')[1]?.split('&') || []
  const result = {}

  queryArr.forEach(item => {
    const [key, value] = item.split('=')
    result[key] = value
  })

  return result
}

export {
  getQuery
}