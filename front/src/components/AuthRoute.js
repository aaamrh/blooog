import { Route, Redirect, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '../utils/constant'

function AuthRoute (props) {
  const token = Cookies.get(TOKEN_KEY)
  const location = useLocation()

  const {path, component} = props

  if (!token) {
     return <Redirect to={{
      pathname: '/login',
      search: `from=${ encodeURIComponent(location.pathname) }`
    }} />
  }

  // TODO 校验token是否有效

  return <Route {...props} />
}

export default AuthRoute