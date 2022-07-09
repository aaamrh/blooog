import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../../components/ArticleCard";
import RhNav from "../../components/RhNav";

import "../../mock/test.mock";
import useLoadmore from "../../hooks/useScroll";
import { getNav } from "../../utils/getNav";
import ArticleApi from "../../api/article";
import img from "/public/images/3dr_mono.png";
import { CLASSIFY_SET } from "../../store/reducer/classify";

// 计算函数
function computedTransform(num, doc) {
  return ((num / doc) * 30 - 15).toFixed(1);
}

// 计算
function computedBGPosition(num, doc) {
  return 60 - Number(((num / doc) * 70).toFixed(1)) + "%";
}

function Home(props) {
  const [articles, setArticles] = useState([]);
  const { data: classifies, classify } = useSelector((state) => state.classify);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const ctntRef = useRef();
  const cardRef = useRef();
  const imgRef = useRef();
  const limit = 10;
  const [domRef, extraData, state] = useLoadmore(limit);

  const { subNavs = [] } = getNav(classifies);
  const subNav = subNavs[`${pathname.split("/")[1]}`] || []; // 二级分类

  useEffect(() => {
    function pictureTranform(e) {
      // cardRef.current.style.transform = `
      // 	rotateX(${-computedTransform(e.clientY, window.innerHeight)}deg)
      // 	rotateY(${computedTransform(e.clientX, window.innerWidth)}deg)
      // `
      cardRef.current.style.backgroundPosition = `
				${computedBGPosition(e.clientX, window.innerWidth)} 
				${computedBGPosition(e.clientY, window.innerHeight)}
			`;
      imgRef.current.style.transform = `
				translateX(${-computedTransform(e.clientX, window.innerWidth)}px)
				translateY(${computedTransform(e.clientY, window.innerHeight)}px)
			`;
    }
    if (ctntRef.current) {
      document.addEventListener("mousemove", pictureTranform);
    }
    return () => {
      document.removeEventListener("mousemove", pictureTranform);
    };
  }, []);

  useEffect(() => {
    setArticles(articles.concat(extraData));
  }, [extraData]);

  useEffect(() => {
    const getArticleType = () => {
      let type = "";

      if (pathname === "/") {
        type = "all";
      } else if (params?.type) {
        type = params.type;
      } else {
        type = subNav[0]?.type;
      }
      return type;
    };
    dispatch({ type: CLASSIFY_SET, classify: getArticleType() });
  }, [pathname]);

  useEffect(() => {
    const getList = (page = 0, classify, limit = 10) => {
      ArticleApi.getArticles({
        params: {
          type: classify,
          cursor: page,
          limit,
          keywords: "",
        },
      })
        .then((res) => {
          const { articles: data } = res.data.data;
          if (page === 0) {
            setArticles(data);
          } else {
            setArticles(articles.concat(data));
          }
        })
        .finally(() => {});
    };
    getList(0, classify);
  }, [classify]);

  return (
    <div className="page-home" ref={ctntRef}>
      <div className="content" ref={domRef}>
        {/* 中间主要内容部分 */}
        <div className="alpha">
          <RhNav className="nav" navlist={subNav} pathname={pathname} />
          {articles.length > 0 &&
            articles.map((article, index) => {
              return <ArticleCard key={index} article={article} />;
            })}
          <p className="msg">{state.code ? state.msg : ""}</p>
        </div>

        {/* 右侧栏 */}
        <div className="beta">
          <div className="m-cube">
            <div className="cube">
              <div className="front surface"> 博学 </div>
              <div className="surface left"> 笃行 </div>
              <div className="surface right"> 厚德 </div>
              <div className="surface bottom"> 重法 </div>
              <div className="surface top"> 克己 </div>
              <div className="surface back"> 慎独 </div>
            </div>
          </div>

          <div className="m-book type-a">
            <div className="page page-1">
              <h1 className="title">《令人哇塞的网站》</h1>
              <div className="bear">
                <div className="content"></div>
              </div>
            </div>
            <div className="page page-2">
              <ul className="list">
                <li>
                  <a
                    to="https://www.ruanyifeng.com/blog/archives.html"
                    target="_blank"
                  >
                    阮一峰
                  </a>
                </li>
                <li>
                  <a to="https://www.zhangxinxu.com/" target="_blank">
                    张鑫旭
                  </a>
                </li>
                <li>
                  <a to="http://best.maruihua.cn/navigation" target="_blank">
                    查看更多
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="m-card">
            <div className="card" ref={cardRef}>
              <img ref={imgRef} src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
