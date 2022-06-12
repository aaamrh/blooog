import { useEffect } from "react";

function useMounted (fn= () => {}) {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    } else {
      console.error('useMounted: 请传入函数')
    }
  }, [])
}

export default useMounted