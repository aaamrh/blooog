import ClassifyApi from "../../api/classify"
import { useDispatch } from 'react-redux'
import { CLASSIFIES_GET } from "../reducer/classify"

function useGetClassify () {
  const dispatch = useDispatch()
  return () => {
    ClassifyApi.getClassify().then(res => {
      dispatch({ type: CLASSIFIES_GET, data: res.data.data })
    })
  }
}

export {
  useGetClassify
}