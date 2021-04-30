const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.options("http://localhost:3000/", cors());

app.use(express.urlencoded());

//कोविड१९भारतसेवा

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err},*******,dirname is `);
  }

  console.log(`Server is running on port: ${port}`);
});
