const CLASSIFIES_GET ='CLASSIFIES_GET'
const CLASSIFY_SET = 'CLASSIFY_SET'

function classify (store={
  data: [], // 所有分类: []
  classify: '' // 当前分类: react
}, action) {
  switch (action.type) {
    case CLASSIFIES_GET:
      return { ...store, data: action.data }

    case CLASSIFY_SET:
      return { ...store, classify: action.classify }

    default:
      return store
  }
}

export {
  CLASSIFIES_GET,
  CLASSIFY_SET
}

export default classify
