import { useEffect, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import axios from 'axios';

const classify = [
  {
    id: 1,
    title: '前端',
    value: 'front-end',
    pid: 0,
  },
  {
    id: 5,
    title: 'JavaScript',
    value: 'js',
    pid: 1
  },
  {
    id: 6,
    title: 'React',
    value: 'react',
    pid: 1
  },
  {
    id: 7,
    title: 'Vue',
    value: 'vue',
    pid: 1
  },
  {
    id: 8,
    title: 'Threejs',
    value: 'threejs',
    pid: 1
  },
  {
    id: 9,
    title: 'WebGL',
    value: 'webgl',
    pid: 1
  },
  {
    id: 2,
    title: '后端',
    value: 'back-end',
    pid: 0
  },
  {
    id: 10,
    title: 'Node',
    value: 'node',
    pid: 2
  },
  {
    id: 11,
    title: 'Koa',
    value: 'koa',
    pid: 2
  },
  {
    id: 12,
    title: 'Express',
    value: 'express',
    pid: 2
  },
  {
    id: 13,
    title: 'Flask',
    value: 'flask',
    pid: 2
  },
  {
    id: 3,
    title: '日记',
    value: 'diary',
    pid: 0
  },
  {
    id: 14,
    title: '理财',
    value: 'financing',
    pid: 3
  },
  {
    id: 15,
    title: '健康',
    value: 'health',
    pid: 3
  },
  {
    id: 16,
    title: '观点与感悟',
    value: 'think',
    pid: 3
  },
  {
    id: 4,
    title: '数据库',
    value: 'database',
    pid: 0
  },
  {
    id: 17,
    title: 'MySQL',
    value: 'mysql',
    pid: 4
  },
  {
    id: 18,
    title: 'MongoDB',
    value: 'mongodb',
    pid: 4
  }
]


function IEditor(props) {
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [htmlContent, setHtmlContent] = useState('');
  const [isEditorShow, setIsEditorShow] = useState(false);
  const [firstC, setFirstC] = useState( classify.find(o => o.pid === 0).id )
  const [secondC, setSecondC] = useState( classify.find(item => item.pid === classify.find(o => o.pid === 0).id).id )
  const [form, setForm] = useState({
    title: '',
    content: ''
  });

  const defaultContent = [
    { type: "paragraph", children: [{ text: `123` }], }
  ]
  
  const toolbarConfig = { }
  const editorConfig = {
    placeholder: '请输入内容...',
    onCreated(editor) { setEditor(editor) }, // 记录下 editor 实例，重要！
    onChange(editor){
      // console.log('content', editor.children, editor.getHtml())
      onChange({
        target: {
          name: 'content',
          value: editor.getHtml()
        }
      })
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
    console.log(form)
  }, [form])


  useEffect(()=>{
    // TODO: 如果有文章id 则默认内容是文章数据
    if (props.match.params?.article_id) {
      axios.get('/api/article/:id').then(res=>{
        const {data} = res.data;
        setHtmlContent(data.content)
      });
    }
    setIsEditorShow(true)
  }, []);
  
  const onChange = (e) => {
    const target = e.target

    if (target.name === 'first-classification') { 
      setFirstC( +target.value ); 
      setSecondC( classify.find(o => o.pid === +target.value).id )
      return 
    }

    if (target.name === 'second-classification') { setSecondC(target.value); return }

    setForm({
      ...form,
      [ target.name ] : target.value
    })
  }

  const submit = () => {
    console.log('发布文章：',  htmlContent, editor.getHtml())
  }

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
                  classify.filter(o => o.pid === 0).map(item => {
                    return <label 
                      htmlFor={item.id} 
                      key={item.id}
                    >
                      { item.title } :
                      <input type="radio" name="first-classification" value={item.id} id={item.id} defaultChecked={item.id===firstC} onChange={ onChange } />
                    </label>
                  })
                }
              </div>
              <div className="selection">
                <h4>二级分类</h4>
                {
                  classify.filter(o => o.pid === +firstC).map(item => {
                    return <label 
                      htmlFor={item.id} 
                      key={item.id}
                    >
                      { item.title } :
                      <input type="radio" 
                        id={item.id} 
                        value={item.id} 
                        name="second-classification" 
                        defaultChecked={ item.id === secondC } 
                        onChange={ onChange } 
                      />
                    </label>
                  })
                }
              </div>
              <button className='editor-btn' onClick={ submit }>发布</button>
              <button className='editor-btn'>保存到草稿</button>
            </aside>

            <div className="editor-container">
              <div className="editor-title">
                <input type={'text'} name="title"  placeholder="请输入标题" onChange={ onChange } />
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