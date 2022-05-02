const { Classify } = require("../db/model");

async function selectClassifies () {
  const result = await Classify.findAll()
  const classifyList = result.map(item => item.dataValues)

  return classifyList
}

module.exports = {
  selectClassifies
}