import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArticleApi from '../../api/article'
import { GET_ARTICLES } from '../reducer/articles'

// FIXME 获取文章信息 但是用的是获取文章列表的接口
function useGetArticle (router) {
  const [article, setArticle] = useState(router.location?.state?.article)

  useEffect(() => {
    if ( !article ) {
      if (router.match.params?.article_id) {
        ArticleApi.getArticles({
          params: { id: router.match.params.article_id }
        }).then(res => {
          if (res.data.code) { return }
          setArticle(res.data.data.articles[0])
        })
      }
    }
  }, [])
  return [article, setArticle]
}

// 获取文章列表
function useGetArticles () {
  const  dispatch = useDispatch()

  return (type, cursor, action) => {
    if (!type) { return  }
    
    return ArticleApi.getArticles({
      params: { 
        type, 
        page: {
          cursor, limit: 6, keywords: ''
        }
      }
    }).then(res => {
      const { code, data } = res.data
      if (code) { return 0 }
      
      dispatch({ type: action,  count: data.count, data: data.articles })
      return data
    })
  }
}

export {
  useGetArticle,
  useGetArticles
}