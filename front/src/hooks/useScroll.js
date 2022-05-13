import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetArticles } from "../store/action/article";
import { GET_MORE_ARTICLES } from "../store/reducer/articles";

let can = true
let noMore = false

function useLoadmore () {
  const dom = useRef(null)
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: classifies, curClassify } = useSelector(state => state.classify)
  const { data: articles } = useSelector(state => state.articles)
  const getArticles = useGetArticles()
  const cursorRef = useRef(1) // 第一页cursor是0， 因此从第二页1开始请求
  
  useEffect(() => {
    const node = dom.current
    // console.log('insert')

    const handleScroll = () => {
      const { scrollHeight, offsetHeight, scrollTop } = node;
      if( can && !noMore ){
        if( scrollHeight <= offsetHeight + scrollTop + 150 ){
          can = false
          console.log('请求中', can)
          setIsLoading(true)
          getArticles( curClassify, cursorRef.current + 1, GET_MORE_ARTICLES ).then(({count, total}) => {
            if (count) { cursorRef.current += 1 }
            can = true
            if (total === articles.length) { 
              noMore = true 
              return setMsg('没有更多数据了')
            }
            setMsg('')
            setIsLoading(false)
          })
          
        }
      }
    }
    node.addEventListener('scroll', handleScroll)

    return function () {
      node.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    dom.current.scrollTop = 0
    cursorRef.current = 0
    noMore = false
  }, [curClassify])
  
  return [dom, isLoading, msg]
}

export default useLoadmore