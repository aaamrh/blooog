const { Classify } = require("../db/model");

async function selectClassifies () {
  const result = await Classify.findAll()
  const classifyList = result.map(item => item.dataValues)

  return classifyList
}

async function selectClassify (id = 0 ) {
  const result = await Classify.findOne({
    where: { id }
  })
  return result.dataValues
}

module.exports = {
  selectClassifies,
  selectClassify
}