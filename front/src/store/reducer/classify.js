const CLASSIFY_GET = Symbol()

function classify (store={
  classify: [{name: 1}]
}, action) {
  switch (action) {
    case CLASSIFY_GET:
      break
    default:
      return store
  }
}

export { CLASSIFY_GET }

export default classify
