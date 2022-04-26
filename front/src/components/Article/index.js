import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function Article (props) {
  let { title, content } = props;

  content = '&nbsp;&lt;<p><span style="background-color: rgb(140, 140, 140);">11123</span></p><p><br></p><ul><li></li></ul><script>console.log(121113)</script>'
  
  return <div className='m-article'>
    <h3> {title} </h3>
    <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />
    <p className='article-info'>发布时间： 20201 <Link to="/editor/123">编辑</Link></p>
    <div dangerouslySetInnerHTML={{
      __html: content
    }}></div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
    <div>{content}</div>
  </div>
}

export default memo(Article);
