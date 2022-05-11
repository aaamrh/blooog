import ClassifyApi from "../../api/classify"
import { useDispatch } from 'react-redux'
import { CLASSIFY_GET } from "../reducer/classify"

function useGetClassify () {
  const dispatch = useDispatch()
  return () => {
    ClassifyApi.getClassify().then(res => {
      dispatch({ type: CLASSIFY_GET, data: res.data.data })
    })
  }
}

export {
  useGetClassify
}