import { useState, useEffect } from "react";
import Article from "../../components/Article";
import ArticleApi from "../../api/article";

function PageArticle(props) {
  const { location, match } = props
  const [article, setArticle] = useState(location.state?.article || null);
  const [isReq, setIsReq] = useState(false);
  const articleId = match.params?.article_id
  
  useEffect(() => {
    if (articleId) {
      !article && setIsReq(true); // 请求是为了增加阅读次数, 如果state中又有数据, 则不显示loading
      ArticleApi.getArticle({ id: articleId }).then((res) => {
        !article && setArticle(res.data.data)
      }).finally(() => { setIsReq(false) });
    }
  }, [])
  
  if (isReq) {
    return <p> 获取文章中... </p>
  } else if (article) {
    return <div className="page-article">
      <div className="page-article-main">
        <Article article={article} />
      </div>
    </div>
  } else {
    return <p> 文章不存在 </p>
  }
}

export default PageArticle;