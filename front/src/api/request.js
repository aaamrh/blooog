import axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '../utils/constant'

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
    const { code, message='' } = response.data

    if (code) {
      handleError(code, message)
      console.error('ιθ――π', response)
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
    const token = Cookies.get(TOKEN_KEY)
    token && (config.headers.Authorization = token)

    return config
  },
  (err) => {
    console.log('θ―·ζ±εΊιδΊ', err, err?.response, err?.request)
  }
)

function handleError (code, message) {
  switch(code){
    case 10008:
      Cookies.remove(TOKEN_KEY)
      alert('code: 10008, ηΆζη ε€±ζ')
      break

    default:
      alert(`π­π­π­ ιθ――: ${code}, ${message}`)
      return Promise.reject()
  }
}

/**
 * ι500ηεε°ιθ――ζ error ε errors δΈ€η§οΌιεε«ε€η
 * @param {string} error
 * @param {{ key: [string, ...] }} errors
 * @param {*} resp
 * @returns string
 */
const formaetErrMsg = (error, errors, resp) => {
  let result = ''

  if (error) { result = error }

  if (result === '' && resp.status === 500) {
    result += `500: ζ₯ε£ ${resp.request.responseURL.split('/api')[1]} εΊι`
  }

  return result
}

export default Request
// export default new Request()  