/**
 * 变量中大写C => classify 的简写
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import request from '../../utils/request';
import { useGetClassify } from '../../store/action';
import ArticleApi from '../../api/article';
import { useGetArticle } from '../../store/action/article';
import { combineReducers } from 'redux';

function notEmptyArr (arr) {
  return arr.length > 0
}

function IEditor(props) {
  // 富文本状态
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [htmlContent, setHtmlContent] = useState(null)
  const [isEditorShow, setIsEditorShow] = useState(false)

  // 其他状态
  const { data: classify } = useSelector(state => state.classify)
  const [article, setArticle] = useGetArticle(props)
  const [firstCId, setFirstCId] = useState(-1) // 一级分类id
  const [secondCId, setSecondCId] = useState(-1) // 二级分类id
  // -------- state end -----------
  
  const getClassify = useGetClassify()
  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
  }
  const articleId = article?.id

  if (firstCId < 0 && notEmptyArr(classify)) {
    const _firstCId = +(classify.find(o => o.parentId === 0).id)
    const _secondCId = +((classify.find(item => +item.parentId === _firstCId))?.id)
    setFirstCId(_firstCId)
    setSecondCId(_secondCId)
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
    // 只在页面打开后, 获取到文章信息后同步一次content
    // 因为Editor会对content进行处理, 所以htmlContent获取到的不是 '', 而是 <p><br></p>
    console.log(article, htmlContent)
    if (  htmlContent === null && article?.content ) {
      setHtmlContent(article?.content)
    }
  }, [article])


  useEffect(()=>{
    setIsEditorShow(true)
    getClassify()
  }, []);

  
  const onChange = (e) => {
    const target = e.target
    if (target.name === 'first-classification') { 
      setFirstCId( +target.value ); 
      setSecondCId( classify.find(o => +o.parentId === +target.value).id )
      return 
    }

    if (target.name === 'second-classification') { setSecondCId(target.value); return }

    setArticle({
      ...article,
      [ target.name ] : target.value
    })
  }

  const submit = async () => {
    let data = {
      ...article,
      firstCId,
      secondCId,
      text: editor.getText(),
      content: editor.getHtml(),
    }
    console.log(articleId)

    // 有 article_id 则是编辑
    if (articleId || +articleId === 0) { // ?? 是为了确保id是 0 是为真值条件, 否则 if 0 不通过
      console.log(21123132)
      const result = await ArticleApi.modifyArticles({
        data,
        id: articleId
      })
      if (result.data.code === 0) {
        return alert('OK')
      }
      return 
    }

    const result = await ArticleApi.publishArticle({ data })
    if (result.data.code === 0) {
      return alert('OK')
    }
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
                  classify.length && classify.filter(o => o.parentId === 0).map(item => {
                    return <label 
                      htmlFor={item.id} 
                      key={item.id}
                    >
                      { item.name } :
                      <input type="radio" name="first-classification" value={item.id} id={item.id} defaultChecked={item.id===firstCId} onChange={ onChange } />
                    </label>
                  })
                }
                { !classify.length && '暂无分类' }
              </div>
              <div className="selection">
                <h4>二级分类</h4>
                {
                  classify.length && classify.filter(o => o.parentId === +firstCId).map(item => {
                    return <label 
                      htmlFor={item.id} 
                      key={item.id}
                    >
                      { item.name } :
                      <input type="radio" 
                        id={item.id} 
                        value={item.id} 
                        name="second-classification" 
                        defaultChecked={ item.id === secondCId } 
                        onChange={ onChange } 
                      />
                    </label>
                  })
                }
                { !classify.length && '暂无分类' }
              </div>
              <button className='editor-btn' onClick={ submit }>发布</button>
              <button className='editor-btn'>保存到草稿</button>
            </aside>

            <div className="editor-container">
              <div className="editor-title">
                <input type={'text'} name="title" value={article?.title}  placeholder="请输入标题" onChange={ onChange } />
              </div>
              <div className="editor-paper">
                <Editor
                  defaultConfig={ editorConfig }
                  value={ htmlContent }
                  onCreated={setEditor}
                  onChange={editor => setHtmlContent(editor.getHtml())}
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