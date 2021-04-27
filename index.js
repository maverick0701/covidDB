const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.options("http://localhost:3000/", cors());
// const os = require("os");
// const fs = require("fs").promises;
// const parse = require("csv-parse/lib/sync");
// const fetch = require("node-fetch");
// const downloadCsv = async () => {
//   try {
//     const target = `https://api.covid19india.org/csv/latest/state_wise.csv`; //file
//     //const target = `https://SOME_DOMAIN.com/api/data/log_csv?$"queryString"`; //target can also be api with req.query

//     const res = await fetch(target, {
//       method: "get",
//       headers: {
//         "content-type": "text/csv;charset=UTF-8",
//         //'Authorization': //in case you need authorisation
//       },
//     });

//     if (res.status === 200) {
//       let data = await res.text();
//       let newdata = parse(data);
//       //   console.log(parse(data));
//       //   console.log(newdata.length);
//       let header = newdata[0];
//       //   console.log(header);
//       //   let finalData = {};
//       //   console.log(header.length);
//       let finalDataArray = [];
//       for (entry of newdata) {
//         if (entry != header) {
//           let object = {};
//           for (let i = 0; i < header.length; i++) {
//             let key = header[i];
//             let value = entry[i];
//             object[key] = value;
//           }
//           finalDataArray.push(object);
//         }
//       }
//       let finalData = { finalDataArray };
//       //   console.log(finalData);
//       return finalData;
//     } else {
//       console.log(`Error code ${res.status}`);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// downloadCsv().then((data) => console.log(data));
app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err},*******,dirname is `);
  }

  console.log(`Server is running on port: ${port}`);
});
