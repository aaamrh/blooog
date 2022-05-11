import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Prism from "prismjs"

function Article (props) {
  const {  article } = props;
  const { classify, classifyId, content = "暂无内容", createdAt, id, title } = article

  const code = `
    const foo = 'foo';
    const bar = 'bar';
    console.log(foo + bar);
  `.trim()
  useEffect(() => {
    console.log('height light')
    Prism.highlightAll();
  }, [])

  return <div className='m-article'>
    <h3> {title} </h3>
    <p className='article-info'>发布时间： {createdAt} <Link to="/editor/123">编辑</Link></p>
    <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />
    
    <pre className="line-numbers">
        <code className="language-js">
          {code}
        </code>
      </pre>
    <div dangerouslySetInnerHTML={{
      __html: content
    }}></div>
  </div>
}

export default memo(Article);
