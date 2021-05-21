const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport-jwt");
const insDb = require("./controller/dbController");
const env = require("./config/environment");
const logger = require("morgan");
app.use(cors());
const chatServer = require("http").Server(app);
let chatsSockets = require("./config/chatSocket").chatSockets(chatServer);
// console.log(chatsSockets.ChatEngine);
// let chatEngine = new chatsSockets.ChatEngine(chatServer);
// chatEngine.connectionHandler();
chatServer.listen(5000);
app.options("*", cors());
app.options("*", cors());

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.use(logger(env.morgan.mode, env.morgan.options));

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err},*******,dirname is `);
  }

  console.log(`Server is running on port: ${port}`);
});
