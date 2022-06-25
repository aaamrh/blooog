import { useMemo, memo } from "react";
import { Link } from "react-router-dom";

function ArticleCard(props) {
  const { article } = props;
  const { title, content, createdAt, read, id, text } = article;
  console.log('article', article)

  return (
    <div className="rh-profile-card">
      <h4 className="rh-profile-card__title">{title}</h4>
      <p className="rh-profile-card__content">{text.slice(0, 150)}...</p>
      <div className="rh-profile-card__footer">
        <div className="infos">
          <span className="info"> 发布日期：{createdAt} </span>
          <span className="info"> 阅读次数：{read} </span>
        </div>
        <Link
          className="rh-btn"
          to={{ pathname: `/article/${id}`, state: { article } }}
        >
          查看全文
        </Link>
      </div>
    </div>
  );
}

export default memo(ArticleCard);
