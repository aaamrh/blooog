const router = require("koa-router")();

const {
  publishArticle,
  getArticleInfo,
  getArticleList,
  getArticleListByClassify,
  modifyArticle,
} = require("../controller/article");

router.prefix("/api/article");

// 获取文章详情
router.get("/:articleId", async (ctx, next) => {
  let { articleId } = ctx.params;
  ctx.body = await getArticleInfo(articleId);
});

// 获取文章详情列表
router.get("/", async (ctx, next) => {
  let params = {};
  let {
    classifyId,
    type = "",
    id,
    name = "",
    cursor,
    limit,
    keywords,
  } = ctx.query;

  type && (params.type = type);
  id && (params.id = id);
  
  if ((type && type !== "all") || name) {
    ctx.body = await getArticleListByClassify(params, {
      cursor,
      limit: +limit,
      keywords,
    });
  } else {
    ctx.body = await getArticleList(params, {
      cursor,
      limit: +limit,
      keywords,
    });
  }
});

// 发布文章
router.post("/", async (ctx, next) => {
  const { title, content, text, classifyId } = ctx.request.body;

  ctx.body = await publishArticle(ctx, {
    title,
    content,
    text,
    classifyId
  });
});

// 修改文章
router.patch("/", async (ctx, next) => {
  const { id, title, content, text, classifyId } = ctx.request.body;

  ctx.body = await modifyArticle(ctx, {
    id,
    title,
    content,
    text,
    classifyId,
  });
});

module.exports = router;
