import { useEffect, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import axios from 'axios';


const FIRST_CLASSIFICATOIN = {
  'diary': '日记',
  'front-end': '前端',
  'back-end': '后端',
  'database': '数据库',
};

const SECOND_CLASSIFICATOIN = {
  'front-end': {
    'js': 'JavaScript',
    'react': "React",
    'vue': 'Vue',
    'threejs': 'Threejs',
    'webgl': 'WebGL'
  },
  'back-end': {
    'node': 'Node',
    'koa': 'Koa',
    'express': 'Express',
    'flask': 'Flask',
  },
  'database': {
    'mongodb': 'MongoDB',
    'mysql': 'MySQL'
  },
  'diary': {
    'investment': '投资',
    'travel': '旅游',
  }
};



function IEditor(props) {
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [htmlContent, setHtmlContent] = useState('');
  const [isEditorShow, setIsEditorShow] = useState(false);
  const [firstClassF, setFirstClassF] = useState('front-end');

  const defaultContent = [
    { type: "paragraph", children: [{ text: `123` }], }
  ]
  
  const toolbarConfig = { }
  const editorConfig = {
    placeholder: '请输入内容...',
    onCreated(editor) { setEditor(editor) }, // 记录下 editor 实例，重要！
    onChange(editor){
      // editor changed
      console.log('content', editor.children, editor.getHtml())
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(()=>{
    // TODO: 如果有文章id 则默认内容是文章数据
    if (props.match.params?.article_id) {
      axios.get('/api/article/:id').then(res=>{
        const {data} = res.data;
        setHtmlContent(data.content)
        setIsEditorShow(true)
      });
    }
  }, []);

  return (
    <div className="page-editor">
      {!isEditorShow && <p>loading</p>}
      {
        isEditorShow &&  <>
          <div className="tool-bar">
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
            />
          </div>
          <div className="editor-main">
            <aside className='m-selections'>
              <div className='selection'>
                <h4>一级分类</h4>
                {
                  Object.keys(FIRST_CLASSIFICATOIN).map((type, index)=>{
                    return <label 
                      htmlFor={type} 
                      key={index}
                    >
                      { FIRST_CLASSIFICATOIN[type] } :
                      <input type="radio" name="first-classification" value={type} id={type} defaultChecked={index===0} />
                    </label>
                  })
                }
              </div>
              <div className="selection">
                <h4>二级分类</h4>
                {
                  Object.keys(SECOND_CLASSIFICATOIN[firstClassF]).map((type, index)=>{
                    return <label htmlFor={type} key={index}>
                      { SECOND_CLASSIFICATOIN[firstClassF][type] }
                      <input type="radio" name="second-classification" value={type} id={type} defaultChecked={index===0} />
                    </label>
                  })
                }
              </div>
              <button className='editor-btn'>发布</button>
              <button className='editor-btn'>保存到草稿</button>
            </aside>

            <div className="editor-container">
              <div className="editor-title">
                <input type={'text'}  placeholder="请输入标题" />
              </div>
              <div className="editor-paper">
                <Editor
                  defaultConfig={editorConfig}
                  // defaultContent={defaultContent}
                  defaultHtml={htmlContent}
                  mode="default"
                  className="paper"
                  style={{ 
                    overflowY: 'hidden', 
                    height: 780,  
                  }}
                />
              </div>
            </div>
            
            <aside className='placeholder'></aside>
          </div>
          
        </>
      }
    </div>
  )
}

export default IEditor;