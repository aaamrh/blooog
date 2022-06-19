import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import CaptchaApi from "../../api/captcha"
import UserApi from "../../api/user"
import useMounted from "../../hooks/useMounted"
import useIsAuth from "../../hooks/useIsAuth"
import { useHistory, useLocation } from "react-router-dom"
import { getQuery } from "../../utils"
import { TOKEN_KEY } from "../../utils/constant"

function Login (props) {
  const [phone,  setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [countdown, setCountdown] = useState(0)
  const history = useHistory()
  const location = useLocation()
  const [isVarified, verify] = useIsAuth()

  useMounted(() => { verify() })

  const getCaptcha = () => {
    setCountdown(60)
    CaptchaApi.getCaptcha().then(res => {
      console.log(res, 'getCaptcha')
      const token = res.data.token;
      Cookies.set(TOKEN_KEY, token)
    })
  }

  useEffect(()=>{
    if (countdown === 0) { return }

    const id = setInterval(() => setCountdown(countdown - 1), 1000)
    return () => clearInterval(id)
  }, [countdown])

  const onLogin = () => {
    UserApi.login({
      data: {
        phone,
        captcha
      }
    }).then(res => {
      if (res.data.data.token) {
        Cookies.set(TOKEN_KEY, res.data.data.token)
        toDestiny()
      }
    })
  }

  function toDestiny () {
    const query = getQuery(location.search)
    const to = query.from || '/'
    history.push(to)
  }

  if (!isVarified) {
    return <div className="page-login">
      <div className="login">
        <div className="form-item" data-label="手机号">
          <input type="text" name="phone" value={ phone } onChange={ (e) => { setPhone(e.target.value) } } />
          <button onClick={ getCaptcha } disabled={ countdown } text=''> {countdown ? `${countdown}s后重试` : '发送验证码'} </button>
        </div>
        <div className="form-item" data-label="验证码">
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