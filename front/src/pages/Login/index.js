import { useState, useRef, useEffect } from "react"
import Cookies from 'js-cookie'
import CaptchaApi from "../../api/captcha"
import UserApi from "../../api/user"
import useMounted from "../../hooks/useMounted"
import useIsAuth from "../../hooks/useIsAuth"
import { useHistory, useLocation } from "react-router-dom"
import { getQuery } from "../../utils"

function Login (props) {
  const [phone,  setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [countdown, setCountdown] = useState(0)
  const history = useHistory()
  const location = useLocation()
  const timer = useRef(null)
  const [isVarified, verify] = useIsAuth()

  useMounted(() => { verify() })

  // if (isVarified) { toDestiny() }

  const onChange = (e) => {
    const { target } = e
  }

  const getCaptcha = () => {
    setCountdown(3)
    CaptchaApi.getCaptcha().then(res => {
      console.log(res)
      const token = res.data.token;
      Cookies.set('tk', token)
    })
    timer.current = setInterval(() => {
      setCountdown(time => {
        if (time === 0) { 
          clearInterval(timer.current)
          timer.current = null
        }
        return time - 1
      } )
    }, 1000)
  }

  const onLogin = () => {
    UserApi.login({
      data: {
        phone,
        captcha
      }
    }).then(res => {
      if (res.data.data.token) {
        Cookies.set('tk', res.data.data.token)
        toDestiny()
      }
    })
  }

  function toDestiny () {
    console.log(location.search, '1')
    const query = getQuery(location.search)
    const to = query.from || '/'
    history.push(to)
  }

  if (!isVarified) {
    return <div className="page-login">
      <div className="login">
        <div className="form-item" data-label="手机号">
          {/* <label htmlFor="">手机号</label> */}
          <input type="text" name="phone" value={ phone } onChange={ (e) => { setPhone(e.target.value) } } />
          <button onClick={ getCaptcha } disabled={ timer.current } text=''> {timer.current ? `${countdown}s后重试` : '发送验证码'} </button>
        </div>
        <div className="form-item" data-label="验证码">
          {/* <label htmlFor="">验证码</label> */}
          <input type="text" value={ captcha } onChange={ (e) => { setCaptcha(e.target.value) } } />
        </div>
        <button className="btn" onClick={onLogin}> 登录 </button>
      </div>
    </div>
  } else {
    toDestiny() 
    return <></>
  }
}

export default Login