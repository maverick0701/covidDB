var Twit = require("twit");

let T = new Twit({
  consumer_key: "TiNXJcueIN9gmt2oUOI1THln9",
  consumer_secret: "FnFbT6tbCWrKDxsrz1ZzbnI9S5x62WwtUnO1vOZg0lvDcI5LKi",
  access_token: "1365298337646223360-mDxhJq6DrNHXB8F04aihkaWRF7nvMl",
  access_token_secret: "uvqUGHZrwGk38Xz8zRuLt6TWfxzxq3ojc3Ock1StsR9B6",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

module.exports.Twit = () => {
  return T;
};
