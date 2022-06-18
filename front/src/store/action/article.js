import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArticleApi from '../../api/article'
import { GET_ARTICLES } from '../reducer/articles'

// FIXME 获取文章信息 但是用的是获取文章列表的接口
function useGetArticle (router) {
  const [article, setArticle] = useState(router.location?.state?.article)
  console.log('router', router)
  useEffect(() => {
    if ( !article ) {
      if (router.match.params?.article_id) {
        ArticleApi.getArticle({
          id: router.match.params.article_id
        }).then(res => {
          if (res.data.code) { return }
          setArticle(res.data.data)
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
          cursor, limit: 2, keywords: ''
        }
      }
    }).then(res => {
      const { code, data } = res.data
      if (code) { return 0 }
      
      dispatch({ type: action,  ...data, data: data.articles })
      return data
    })
  }
}

export {
  useGetArticle,
  useGetArticles
}