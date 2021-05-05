const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  //   console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(201, {
        message: "Invalid username or password",
      });
    }
    let newUser = { email: user.email, id: user._id };
    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(newUser, "covidDB", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.signUp = function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.json(401, {
      data: {
        message: "password and confirm password doesnot match",
      },
    });
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return res.json(402, {
        data: {
          message: "user already exsits",
        },
      });
    } else {
      User.create(
        {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        },
        (err, user) => {
          return res.json(202, {
            data: {
              message: "user created",
            },
          });
        }
      );
    }
  });
};

module.exports.failiureRedirect = (req, res) => {
  return res.json("402", {
    data: {
      message: "invalid username or password",
    },
  });
};
