import axios from 'axios'

class Request {
  constructor(){
    this.request = _request
  }
}

const _request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

_request.interceptors.response.use(
  (response) => {
    // console.log('response', response)

    return response
  },
  (err) => {
    // console.log(err, err.response)

    return Promise.reject('sth error')
  }
)


_request.interceptors.request.use(
  (config) => {
    // token && config.headers.Authorization = token
    return config
  },
  (err) => {
    console.log('请求出错了', err, err?.response, err?.request)
  }
)

/**
 * 非500的后台错误有 error 和 errors 两种，需分别处理
 * @param {string} error
 * @param {{ key: [string, ...] }} errors
 * @param {*} resp
 * @returns string
 */
const formatErrMsg = (error, errors, resp) => {
  let result = ''

  if (error) { result = error }

  if (errors) {
    for (const i in errors) { result += `${i}: ${errors[i].join('、')}\n` }
  }

  if (result === '' && resp.status === 500) {
    result += `500: 接口 ${resp.request.responseURL.split('/api')[1]} 出错`
  }

  return result
}

export default Request
// export default new Request()  