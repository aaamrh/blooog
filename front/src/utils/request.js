import axios from 'axios'
import Cookies from 'js-cookie'

class Request {
  constructor(){
    this.request = _request
  }
}

const _request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
})

_request.interceptors.response.use(
  (response) => {
    console.log('response', response)
    const { code } = response.data

    if (code) {
      handleError(code)
      return Promise.reject(response)
    }

    return response
  },
  (err) => {
    // console.log(err, err.response)
    return Promise.reject(err)
  }
)


_request.interceptors.request.use(
  (config) => {
    const token = Cookies.get('tk')
    token && (config.headers.Authorization = token)

    return config
  },
  (err) => {
    console.log('请求出错了', err, err?.response, err?.request)
  }
)

function handleError (code) {
  switch(code){
    case 10008:
      Cookies.remove('tk')
      break

    default:
      return Promise.reject()
  }
}

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