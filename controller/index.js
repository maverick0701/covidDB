const getStatesData = require("../utils/stateHelper").getStatesData;
const search = require("../utils/stateHelper").queryData;

module.exports.getStates = async (req, res) => {
  const { apiName } = req.body;
  let data = await getStatesData(apiName);
  return res.json(201, {
    message: "Succesfully Queried States",
    data: {
      data: data,
    },
  });
};

module.exports.getByStateName = async (req, res) => {
  const { apiName } = req.body;
  let data = await getStatesData(apiName);
  const { queryData, queryField } = req.body;
  let searchResult = search(queryData, queryField, data.finalDataArray);
  return res.json(201, {
    message: "Succesfully Queried States",
    data: {
      data: searchResult,
    },
  });
};
