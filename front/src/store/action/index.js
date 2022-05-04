import ClassifyApi from "../../api/classify"
import { useDispatch } from 'react-redux'
import { CLASSIFY_GET } from "../reducer/classify"

function useGetClassifies (params) {
  const dispatch = useDispatch()
  return ClassifyApi.getClassify(`/api/classify`).then(res => {
    console.log('获取分类', res)
    dispatch({ type: CLASSIFY_GET })
  })
}

export {
  useGetClassifies
}