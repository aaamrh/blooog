import Article from "../../components/Article";

function PageArticle(props) {
  const { article } = props.location.state

  return <div className="page-article">
    <Article article={article} />
  </div>
}

export default PageArticle;