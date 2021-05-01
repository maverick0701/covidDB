const Twit = require("../config/twit").Twit;
let T = Twit();

function getHastagInfo(entities) {
  let hashtags = entities.hashtags;
  let hashtagText = [];
  for (let i = 0; i < hashtags.length; i++) {
    hashtagText.push(hashtags[i].text);
  }
  return hashtagText;
}

function getUserMention(entities) {
  let user_mentions = entities.user_mentions;
  return user_mentions;
}

function getTweetLink(data) {
  return "https://twitter.com/" + data;
}

function getTextAndUser(data) {
  let tweets = [];
  data.forEach((element) => {
    let newTweet = {};
    newTweet.txt = element.text;
    newTweet.userName = element.user.name;
    newTweet.screenName = element.user.screen_name;
    newTweet.hashtag = getHastagInfo(element.entities);
    // newTweet.user_mentions = getUserMention(element.entities);
    newTweet.userLink = getTweetLink(element.user.screen_name);
    tweets.push(newTweet);
  });
  // console.log(tweets);
  return tweets;
}

module.exports.getAllTweets = function (req, res) {
  let { location } = req.query;
  let newPromise = new Promise(function (resolve, reject) {
    // do some long running async thingâ€¦
    T.get(
      "search/tweets",
      {
        q: `#Oxygen #verified #oxygenRefill #${location} since:2021-04-30`,
        count: 5,
      },
      function (err, data, response) {
        console.log(err);
        let status = data.statuses;
        let tweets = getTextAndUser(status);
        if (tweets) {
          resolve(tweets);
        } else {
          reject(err);
        }
      }
    );
  });
  let newPromise1 = new Promise(function (resolve, reject) {
    // do some long running async thingâ€¦
    T.get(
      "search/tweets",
      {
        q: `#Hospital  #OxygenCylinder  #${location} since:2021-04-30`,
        count: 5,
      },
      function (err, data, response) {
        let status = data.statuses;
        let tweets = getTextAndUser(status);
        if (tweets) {
          resolve(tweets);
        } else {
          reject(err);
        }
      }
    );
  });
  let newPromise2 = new Promise(function (resolve, reject) {
    // do some long running async thingâ€¦
    T.get(
      "search/tweets",
      {
        q: `#CovidIndiaInfo #oxygenRefill  #${location} since:2021-04-30`,
        count: 5,
      },
      function (err, data, response) {
        let status = data.statuses;
        let tweets = getTextAndUser(status);
        if (tweets) {
          resolve(tweets);
        } else {
          reject(err);
        }
      }
    );
  });

  let newPromise3 = new Promise(function (resolve, reject) {
    // do some long running async thingâ€¦
    T.get(
      "search/tweets",
      { q: `#कोविड१९भारतसेवा since:2021-04-30`, count: 3 },
      function (err, data, response) {
        let status = data.statuses;
        let tweets = getTextAndUser(status);
        if (tweets) {
          resolve(tweets);
        } else {
          reject(err);
        }
      }
    );
  });

  Promise.all([newPromise, newPromise1, newPromise2, newPromise3]).then(
    (values) => {
      if (values) {
        let data = [...values[0], ...values[1], ...values[2], ...values[3]];
        return res.json(201, {
          message: "success",
          data: data,
          length: data.length,
        });
      }
    }
  );
};
