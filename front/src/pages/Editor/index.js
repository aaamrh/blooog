/**
 * 变量中大写C => classify 的简写
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import { useGetClassify } from "../../store/action";
import ArticleApi from "../../api/article";
import { useGetArticle } from "../../store/action/article";

function notEmptyArr(arr) {
  return arr.length > 0;
}

function IEditor(props) {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [artic, setArtic] = useState({});
  const [isEditorShow, setIsEditorShow] = useState(false);
  const [firstCId, setFirstCId] = useState(-1); // 一级分类id
  const [secondCId, setSecondCId] = useState(-1); // 二级分类id

  // 其他状态
  const { data: classify } = useSelector((state) => state.classify);
  const { data: article } = useSelector((state) => state.article);
  const { article_id: articleId } = useParams();
  const getArticle = useGetArticle(); // TODO 获取文章信息
  const getClassify = useGetClassify();
  // -------- state end -----------

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (firstCId < 0 && notEmptyArr(classify)) {
      const _firstCId = +classify.find((o) => o.parentId === 0).id;
      const _secondCId = +classify.find((item) => +item.parentId === _firstCId)
        ?.id;
      setFirstCId(_firstCId);
      setSecondCId(_secondCId); // 根据一级分类, 设置默认二级分类
    }
  }, [classify, firstCId]);

  useEffect(() => {
    (articleId || articleId === 0) && getArticle(articleId);
  }, articleId);

  useEffect(() => {
    if (article.uuid) {
      setFirstCId(article?.classify.parentId);
      setSecondCId(article?.classifyId);
      setArtic(article);
    }
  }, [article]);

  useEffect(() => {
    setIsEditorShow(true);
    getClassify();
  }, []);

  const onChange = (e) => {
    const target = e.target;
    if (target.name === "first-classify") {
      setFirstCId(+target.value);
      return;
    }
    if (target.name === "second-classify") {
      setSecondCId(+target.value);
      return;
    }

    setArtic({
      ...artic,
      [target.name]: target.value,
    });
  };

  const submit = async () => {
    let data = {
      ...artic,
      classifyId: secondCId,
      text: editor.getText(),
      content: editor.getHtml(),
    };

    // 有 article_id 则是编辑
    if (articleId || +articleId === 0) {
      const result = await ArticleApi.modifyArticles({
        data,
        uuid: articleId,
      });
      if (result.data.code === 0) {
        return alert("OK");
      }
      return;
    }

    const result = await ArticleApi.publishArticle({ data });
    if (result.data.code === 0) {
      return alert("OK");
    }
  };

  return (
    <div className="page-editor">
      <div className="editor">
        <div className="tool-bar">
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
          />
        </div>
        <div className="editor-main">
          <aside className="m-selections">
            <div className="selection">
              <h4>一级分类</h4>
              {classify.length &&
                classify
                  .filter((o) => o.parentId === 0)
                  .map((item) => {
                    return (
                      <label htmlFor={item.id} key={item.id}>
                        {item.name} :
                        <input
                          id={item.id}
                          type="radio"
                          name="first-classify"
                          value={item.id}
                          checked={item.id === firstCId}
                          onChange={onChange}
                        />
                      </label>
                    );
                  })}
              {!classify.length && "暂无分类"}
            </div>
            <div className="selection">
              <h4>二级分类</h4>
              {classify.length &&
                classify
                  .filter((o) => o.parentId === +firstCId)
                  .map((item) => {
                    return (
                      <label htmlFor={item.id} key={item.id}>
                        {item.name} :
                        <input
                          type="radio"
                          id={item.id}
                          value={item.id}
                          name="second-classify"
                          checked={item.id === secondCId}
                          onChange={onChange}
                        />
                      </label>
                    );
                  })}
              {!classify.length && "暂无分类"}
            </div>
            <button className="editor-btn" onClick={submit}>
              发布
            </button>
            <button className="editor-btn">保存到草稿</button>
          </aside>

          <div className="editor-container">
            <div className="editor-title">
              <input
                type="text"
                name="title"
                defaultValue={artic.title}
                placeholder="请输入标题"
                onChange={onChange}
              />
            </div>
            <div className="editor-paper">
              <Editor
                defaultConfig={editorConfig}
                value={artic.content}
                onCreated={setEditor}
                // onChange={editor => setHtmlContent(editor.getHtml())}
                mode="default"
                style={{
                  overflowY: "hidden",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {!isEditorShow && <p>loading</p>}
      {isEditorShow && <></>}
    </div>
  );
}

export default IEditor;
