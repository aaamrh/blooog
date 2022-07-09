import { useState, useEffect } from "react";
import Article from "../../components/Article";
import ArticleApi from "../../api/article";

function PageArticle(props) {
  const { location, match } = props
  const [article, setArticle] = useState(location.state?.article || null);
  const [isReq, setIsReq] = useState(false);
  const articleId = match.params?.article_id
  
  useEffect(() => {
    if (!article && articleId) {
      setIsReq(true);
      ArticleApi.getArticle({ id: articleId }).then((res) => {
        if (res.data.code) {
          return
        } 
        setArticle(res.data.data)
      }).finally(() => { setIsReq(false) });
    }
  }, [articleId, article])

  
  if (isReq) {
    return <p> 获取文章中... </p>
  } else if (article) {
    return <div className="page-article">
      <Article article={article} />
    </div>
  } else {
    return <p> 文章不存在 </p>
  }
}

export default PageArticle;