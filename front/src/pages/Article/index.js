import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import Article from "../../components/Article";

function PageArticle(props) {
  // const [article, setArticle] = useState({});
  const {match} = props;
  const { article } = props.location.state
  const {article_id} = match.params;
  console.log(props)

  // useEffect(()=>{
  //   axios.get('/api/article/:id').then(res=>{
  //     const {data} = res.data;
  //     console.log(data, 11111)
  //     setArticle(data);
  //   })  
  // }, [])

  return <div className="page-article">
    <Article article={article} />
  </div>
}

export default PageArticle;