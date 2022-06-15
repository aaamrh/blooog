import { Route, Redirect, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

function AuthRoute (props) {
  const token = Cookies.get('tk')
  const location = useLocation()

  const {path, component} = props

  if (!token) {
     return <Redirect to={{
      pathname: '/login',
      search: `from=${ location.pathname }`
    }} />
  }

  // TODO 校验token是否有效

  return <Route {...props} />
}

export default AuthRoute