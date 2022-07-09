import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import ArticleApi from "../api/article";

let can = true
let noMore = false

function useLoadmore (limit=10) {
  const dom = useRef(null)
  const [result, setResult] = useState([])
  const [state, setState] = useState(0)
  const { classify } = useSelector(state => state.classify) // FIXME 可以从url中获取
  
  const cursorRef = useRef(1)
  const stateMap = {
    0: {
      code: 0,
      msg: '加载完成'
    },
    1:{
      code: 1,
      msg: '加载中...'
    },
    2:{
      code: 2,
      msg: '没有更多数据了'
    },
  }

  const handleScroll = () => {
    const { scrollHeight, offsetHeight, scrollTop } = dom.current;
    // 非请求状态 和 有更多数据时，才进行请求
    if( can && !noMore ){
      if( scrollHeight <= offsetHeight + scrollTop + 150 ){
        can = false
        setState(1)
        // 请求更多
        // 页数 每页多少个
        ArticleApi.getArticles({
          params: {
            type: classify, // 分类
            cursor: cursorRef.current,
            limit,
            keywords: "",
          },
        }).then(res => {
          // noMore ??? 返回数量小于 limit 时，说明没有更多数据了
          console.log('🥝🥝🥝🥝🥝', res)
          const { articles, totalPage } = res.data.data
          setResult(articles)
          setState(0)
          cursorRef.current += 1
          if (cursorRef.current >= totalPage) {
            noMore = true
            setState(2)
          }
        }).finally(() => {
          can = true
        })

      }
    }
  }

  useEffect(() => {
    const node = dom.current
    node.addEventListener('scroll', handleScroll)
    return () => {
      console.log('remove dom')
      node.removeEventListener('scroll', handleScroll)
    }
  }, [dom])

  useEffect(() => {
    dom.current.scrollTop = 0
    cursorRef.current = 1
    noMore = false
  }, [classify])
  
  return [dom, result, stateMap[state] ]
}

export default useLoadmore