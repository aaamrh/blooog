import { useMemo, memo } from "react";
import { Link } from "react-router-dom"

function ArticleCard (props) {
  const { title, content, time, read, _id } = props;

  return <div className="rh-profile-card">
  <h4 className="rh-profile-card__title">{title}</h4>
  <p className="rh-profile-card__content">
    {content}
  </p>
  <div className="rh-profile-card__footer">
    <div className="infos">
      <span className="info"> 发布日期：{time} </span>
      <span className="info"> 阅读次数：{read} </span>
    </div>
    <Link className="rh-btn" to={`/article/${_id}`} target = "_blank">查看全文</Link>
  </div>
</div>
}


export default memo(ArticleCard)