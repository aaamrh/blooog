import { useDispatch } from 'react-redux'
import ArticleApi from '../../api/article'

const GET_ARTICLES = 'GET_ARTICLES'
const GET_MORE_ARTICLES = 'GET_MORE_ARTICLES'

function articles (state = {
  count: -1,
  data: []
}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { count: action.count, data: action.data }

    case GET_MORE_ARTICLES:
      return { count: state.count + action.count, data: state.data.concat(action.data) }

    default: 
      return state
  }
}

export {
  GET_ARTICLES,
  GET_MORE_ARTICLES
}

export default articles