import { memo, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import dayjs from "dayjs";
import Prism from "prismjs"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function Article (props) {
  const { article } = props;
  console.log(article)
  const { classify, classifyId, content = "暂无内容", createdAt, uuid, title } = article

  useEffect(() => {
    Prism.highlightAll();
  }, [])

  return <div className='m-article'>
    <h1> {title} </h1>
    <p className='article-info'>发布时间： {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")} <Link to={{ pathname:`/e/${uuid}`, state: {article} }}>编辑</Link></p>
    {/* <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} /> */}
    
    <div className='article-content' dangerouslySetInnerHTML={{
      __html: content
    }}></div>
  </div>
}

export default memo(Article);
