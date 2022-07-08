import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ArticleApi from "../../api/article";
import { ARTICLE_GET, ARTICLE_LOADING } from "../reducer/article";

// FIXME 获取文章信息 但是用的是获取文章列表的接口
/**
 * 获取文章信息
 * @param { num } id 文章id
 * @returns
 */
function useGetArticle() {
  const dispatch = useDispatch()

  return (id) => {
    dispatch({ type: ARTICLE_LOADING })
    ArticleApi.getArticle({ id }).then((res) => {
      if (res.data.code) {
        return
      }
      console.log(res)
      dispatch({ type: ARTICLE_GET, data: res.data.data })
    });
  }
}

// function useGetArticle(router) {
//   const [article, setArticle] = useState(router.location?.state?.article);
//   useEffect(() => {
//     if (!article) {
//       if (router.match.params?.article_id) {
//         ArticleApi.getArticle({
//           id: router.match.params.article_id,
//         }).then((res) => {
//           if (res.data.code) {
//             return;
//           }
//           setArticle(res.data.data);
//         });
//       }
//     }
//   }, []);
//   return [article, setArticle];
// }

// 获取文章列表
function useGetArticles() {
  const dispatch = useDispatch();

  return (type, cursor, action) => {
    if (!type) {
      return;
    }

    return ArticleApi.getArticles({
      params: {
        type, // 分类
        cursor,
        limit: 10,
        keywords: "",
      },
    }).then((res) => {
      const { code, data } = res.data;

      if (code) {
        return 0;
      }

      console.log("data", data);

      dispatch({ type: action, ...data, data: data.articles });
      return data;
    });
  };
}

export { useGetArticle, useGetArticles };
