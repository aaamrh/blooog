import { memo, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Prism from "prismjs"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function Article (props) {
  const {  article } = props;
  const { classify, classifyId, content = "暂无内容", createdAt, id, title } = article

  useEffect(() => {
    Prism.highlightAll();
  }, [])

  return <div className='m-article'>
    <h3> {title} </h3>
    <p className='article-info'>发布时间： {createdAt} <Link to={{ pathname:`/editor/${id}`, state: {article} }}>编辑</Link></p>
    {/* <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} /> */}
    
    <div dangerouslySetInnerHTML={{
      __html: content
    }}></div>
  </div>
}

export default memo(Article);
