# 前端

## 接口设计

|       |  api  |  方法 | 描述  |
|  ---  |  ---  |  ---  | ---  |
| 文章列表        | /<大分类>/<二级分类>           | GET   |              |
| 文章列表翻页    | /article/loadMore/pageIndx    | POST   | pageIndex是第几页 |
| 文章详情        | /article/_id                  | GET   | _id非DB自动生成的id，是某规则生成的字符 | 
| 发布文章        | /article/create               | POST  |  |
| 修改文章        | /article/update/_id           | PATCH |  |
| 删除文章        | /article/delete/_id           | DELETE | 不要删除, 通过状态标记为删除  |

<!-- 
    session_token=e66664216447da79d91c788fbcfecb5c&desktop=true
    &page_number=7
    &limit=6
    &action=down
    &after_id=35      返回【36, 37, 38, 39, 40, 41】
    &ad_interval=-10 
-->