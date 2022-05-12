import { useEffect, useState } from 'react'
import ArticleApi from '../../api/article'

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

export default useGetArticle