const { Classify } = require("../db/model");

async function selectClassifies () {
  const result = await Classify.findAll()
  const classifyList = result.map(item => item.dataValues)

  return classifyList
}

async function selectClassify (id = -1, parentId = -1) {
  let params = {}

  console.log(id, parentId, 'selectClassify')

  if (parentId > 0) {
    params.id = parentId
  } else if (id > 0) {
    params.id = id
  }

  const result = await Classify.findOne({
    where: { ...params }
  })
  console.log(result, 'result')
  return result.dataValues
}

module.exports = {
  selectClassifies,
  selectClassify
}