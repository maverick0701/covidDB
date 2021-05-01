const api = require("../utils/api").api();
const axios = require("axios");

function searchHospital(data, state) {
  let resultArray = [];
  data.forEach((element) => {
    if (element.state == state) {
      resultArray.push(element);
    }
  });
  return resultArray;
}

module.exports.getHospitalList = async function (req, res) {
  let { location } = req.query;
  let urls = api.hopitalList;
  let promise = new Promise(function (resolve, reject) {
    axios.get(urls).then((data) => {
      //   console.log(data.data);
      if (data.data) {
        resolve(data.data.data);
      }
    });
  });
  promise.then(function (data) {
    // console.log(data);
    // console.log(location);
    let resultArray = searchHospital(data, location);
    // console.log(resultArray);
    return res.json(201, {
      message: "success",
      data: resultArray,
    });
  });
};
