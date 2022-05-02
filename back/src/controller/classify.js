const { Classify } = require("../db/model")
const { selectClassifies } = require("../services/classify")
const { getClassifyListFailInfo } = require("../utils/errorInfo")
const { SuccessModel, ErrorModel } = require("../utils/resModel")


/**
 * 获取分类列表
 * @returns 
 */
async function getClassifyList () {
  try {
    const result = await selectClassifies()
    return new SuccessModel(result)
  } catch (e) {
    console.log('getClassifyList', e)
    return new ErrorModel(getClassifyListFailInfo)
  }
}

module.exports = {
  getClassifyList
}