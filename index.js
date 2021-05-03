const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport-jwt");
app.use(cors());
app.options("http://localhost:3000/", cors());

app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err},*******,dirname is `);
  }

  console.log(`Server is running on port: ${port}`);
});
