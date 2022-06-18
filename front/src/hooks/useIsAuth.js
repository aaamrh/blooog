import { useState } from "react";
import Cookies from "js-cookie";
import UserApi from "../api/user";

/**
 * 校验是否已登录
 */
function useIsAuth(key = "tk") {
  const [isAuth, setIsAuth] = useState(false);
  const token = Cookies.get(key);
  
  function verify() {
    if (!token) {
      return setIsAuth(false);
    }
  
    UserApi.isAuth().then((res) => {
      console.log('request', res)
      if (res.data.code === 0) {
        return setIsAuth(true);
      }
      return setIsAuth(false);
    });
  }

  return [isAuth, verify];
}

export default useIsAuth;
