import { useState, useRef, useEffect } from "react"

function Login (props) {
  const [phone,  setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [countdown, setCountdown] = useState(0)
  const timer = useRef(null)

  const onChange = (e) => {
    const { target } = e
  }

  const getCaptcha = () => {
    setCountdown(3)
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

  useEffect(() => {}, [])

  const onLogin = () => {}

  return <div className="page-login">
    <div className="login">
      <div className="form-item" data-label="手机号">
        {/* <label htmlFor="">手机号</label> */}
        <input type="text" name="phone" value={ phone } onChange={ (e) => { setPhone(e.target.value) } } />
        <button onClick={ getCaptcha } disabled={ timer.current } text=''> {timer.current ? `${countdown}s后重试` : '发送验证码'} </button>
      </div>
      <div className="form-item" data-label="验证码">
        {/* <label htmlFor="">验证码</label> */}
        <input type="text" value={captcha} onChange={ (e) => { setCaptcha(e.target.value) } } />
      </div>
      <button className="btn"> 登录 </button>
    </div>
  </div>
}

export default Login