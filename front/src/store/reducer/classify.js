const CLASSIFY_GET ='CLASSIFY_GET'
const SET_CURRENT_CLASSIFY = 'SET_CURRENT_CLASSIFY'

function classify (store={
  data: [],
  curClassify: ''
}, action) {
  switch (action.type) {
    case CLASSIFY_GET:
      return { ...store, data: action.data }

    default:
      return store
  }
}

export {
  CLASSIFY_GET
}

export default classify
