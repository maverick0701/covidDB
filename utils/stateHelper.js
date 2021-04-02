const os = require("os");
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");
const fetch = require("node-fetch");
module.exports.getStatesData = async () => {
  try {
    const target = `https://api.covid19india.org/csv/latest/state_wise.csv`; //file
    const res = await fetch(target, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
        //'Authorization': //in case you need authorisation
      },
    });

    if (res.status === 200) {
      let data = await res.text();
      let newdata = parse(data);
      let header = newdata[0];
      let finalDataArray = [];
      for (entry of newdata) {
        if (entry != header) {
          let object = {};
          for (let i = 0; i < header.length; i++) {
            let key = header[i];
            let value = entry[i];
            object[key] = value;
          }
          finalDataArray.push(object);
        }
      }
      let finalData = { finalDataArray };
      return finalData;
    } else {
      console.log(`Error code ${res.status}`);
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports.queryData = (queryData, queryField, data) => {
  let reqData = {};
  data.forEach((data) => {
    if (data[queryField] === queryData) {
      reqData = data;
    }
  });
  return reqData;
};
