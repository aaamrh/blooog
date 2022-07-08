import { useDispatch } from 'react-redux'
import ArticleApi from '../../api/article'

const GET_ARTICLES = 'GET_ARTICLES'
const ARTICLES_LOADING = 'ARTICLES_LOADING'
const GET_MORE_ARTICLES = 'GET_MORE_ARTICLES'

function articles (state = {
  loading: false,
  count: -1,
  data: []
}, action) {
  const { count, data } = state

  switch (action.type) {
    case GET_ARTICLES:
      return { loading: false, count: action.count, data: action.data }

    case ARTICLES_LOADING: 
      return { loading: true, data, count }

    case GET_MORE_ARTICLES:
      return { loading: true, count: count + action.count, data: data.concat(action.data) }

    default: 
      return state
  }
}

export {
  GET_ARTICLES,
  GET_MORE_ARTICLES
}

export default articles