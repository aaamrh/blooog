const CLASSIFY_GET ='CLASSIFY_GET'

function classify (store={
  data: []
}, action) {
  switch (action.type) {
    case CLASSIFY_GET:
      return { data: action.data }
    default:
      return store
  }
}

export { CLASSIFY_GET }

export default classify
