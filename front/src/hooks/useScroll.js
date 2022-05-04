import { useEffect, useRef, useState } from "react";

let can = true

function useLoadmore (cb) {
  const dom = useRef(null)
  const loadMore = useRef(true)
  const [data, setData] = useState(null)
  // const [loadMore, setLoadMore] = useState(true)

  useEffect(() => {
    const node = dom.current
    const handerScroll = () => {
      const { scrollHeight, offsetHeight, scrollTop } = node;
      if( scrollHeight <= offsetHeight + scrollTop + 200 ){
        if( can ){
          can = false
          console.log('请求中 不能请求了')
          cb().then(res=>{
            const { code, data } = res;
            console.log(data)
            setData(data)
          }).finally(()=>{
            setTimeout(() => {
              can = true
            }, 30);
          })
        }
      }
    }
    node.addEventListener('scroll', handerScroll)

    return function () {
      node.removeEventListener('scroll', handerScroll)
    }
  }, [])
  // return function(e){
	// 	const { scrollHeight, offsetHeight, scrollTop } = e.target;
	// 		if( scrollHeight <= offsetHeight + scrollTop + 200 ){
	// 			if( canLoadMore ){
	// 				canLoadMore = false;
	// 				cb()
	// 			}
	// 		}
	// } 
  return [can, dom, data]
}

export default useLoadmore