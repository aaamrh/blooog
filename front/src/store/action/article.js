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

export { useGetArticle };
