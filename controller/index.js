const os = require("os");
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");
const fetch = require("node-fetch");

module.exports.getStates = async (request, response) => {
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
      return response.json(201, {
        message: "Succesfully Queried States",
        data: {
          data: finalData,
        },
      });
    } else {
      console.log(`Error code ${res.status}`);
      return response.json(401, {
        message: "data not queried",
        data: {
          data: res.status,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
