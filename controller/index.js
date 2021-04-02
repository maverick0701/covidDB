const os = require("os");
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");
const fetch = require("node-fetch");
const getStatesData = require("../utils/stateHelper").getStatesData;
const search = require("../utils/stateHelper").queryData;

module.exports.getStates = async (req, res) => {
  let data = await getStatesData();
  return res.json(201, {
    message: "Succesfully Queried States",
    data: {
      data: data,
    },
  });
};

module.exports.getByStateName = async (req, res) => {
  let data = await getStatesData();
  const { queryData, queryField } = req.body;
  let searchResult = search(queryData, queryField, data.finalDataArray);
  return res.json(201, {
    message: "Succesfully Queried States",
    data: {
      data: searchResult,
    },
  });
};
