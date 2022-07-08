const ARTICLE_GET = 'ARTICLE_GET'
const ARTICLE_LOADING = 'ARTICLE_LOADING'

function article (state = {
  loading: false,
  data: {}
}, action) {
  switch (action.type) {
    case ARTICLE_GET:
      return { loading: false, data: action.data }

    case ARTICLE_LOADING: 
      return { loading: true, data: {} }

    default: 
      return state
  }
}

export {
  ARTICLE_GET,
  ARTICLE_LOADING
}

export default article