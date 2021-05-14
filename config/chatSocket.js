let api = require("../utils/api").api;
let axios = require("axios");

// class ChatBot {
//   constructor() {
//     this.question = [];
//     this.ans = [];
//     this.length = 0;
//     this.current = 0;
//     this.shouldStop;
//   }
//   initialise(stop) {
//     this.question = [];
//     this.length = 0;
//     this.current = 0;
//     this.shouldStop = stop;
//   }
//   enteryForGroupMultiple(datas, type, stop) {
//     this.initialise(stop);
//     datas.forEach((data) => {
//       let newquestion = {};
//       newquestion.name = data.name;
//       newquestion.id = data.id;
//       newquestion.choices = data.choices;
//       newquestion.type = type;
//       this.question.push(newquestion);
//     });
//     console.log(this.question);
//     this.current = 0;
//     this.length = this.question.length;
//   }

//   handleGroupSingle(text, items, stop, type) {
//     this.initialise(stop);
//     items.forEach((ques) => {
//       let newquestion = {};
//       newquestion.id = ques.id;
//       newquestion.name = ques.name;
//       newquestion.choices = ques.choices;
//       this.question.push(newquestion);
//     });
//   }

//   poulateQuestion(items, type, stop, question) {
//     // console.log(items);
//     if (type == "group_multiple")
//       this.enteryForGroupMultiple(items, type, stop);
//     if (type == "group_single")
//       this.handleGroupSingle(question.text, items, type, stop);
//   }
//   checkShouldStop() {
//     return this.shouldStop;
//   }
//   incrementCurrent() {
//     this.current++;
//   }
// }

// function onJoinRoom(data, socket, io) {
//   socket.join(data.chatRoom);
//   let newBot;
//   return new Promise(function (resolve, reject) {
//     fetchDataForBot([], headers, urls).then((res) => {
//       newBot = new ChatBot();
//       callPopulateQuestion(res, newBot);
//       io.in(data.chatRoom).emit("userJoined", newBot.question[0]);
//       newBot.current++;
//       if (res) {
//         resolve(newBot);
//       } else {
//         reject("socket error");
//       }
//     });
//   });
// }

// function fetchDataForBot(evidence, headers, urls) {
//   return axios.post(
//     urls,
//     {
//       sex: "male",
//       age: 30,
//       evidence: evidence,
//     },
//     {
//       headers: headers,
//     }
//   );
// }

// function callPopulateQuestion(res, Bot) {
//   console.log(res.data.question.type);
//   Bot.poulateQuestion(
//     res.data.question.items,
//     res.data.question.type,
//     res.data.should_stop,
//     res.data.question
//   );
// }

// function handleShouldStopFalse(newBot, chatRoom, io) {
//   fetchDataForBot(newBot.ans, headers, urls).then((res) => {
//     callPopulateQuestion(res, newBot);
//     io.in(chatRoom).emit("userJoined", newBot.question[0]);
//     newBot.incrementCurrent();
//   });
// }

// function handleShouldStopTrue(newBot, chatRoom, io, evidence) {
//   console.log(evidence);
//   let urls = api().triage;
//   fetchDataForBot(evidence, headers, urls).then((res) => {
//     console.log(res.data);
//   });
// }

// module.exports.chatSockets = function (socketServer) {
//   let newBot;
//   const io = require("socket.io")(socketServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.sockets.on("connection", function (socket) {
//     console.log("connection has begun");
//
//     socket.on("joinRoom", function (data) {
//       onJoinRoom(data, socket, io).then((Bot) => {
//         newBot = Bot;
//       });
//     });
//     socket.on("answerChat", function (data) {
//       newBot.ans.push(data.ans);
//       if (newBot.current < newBot.length) {
//         io.in(data.chatRoom).emit(
//           "recieveMessage",
//           newBot.question[newBot.current]
//         );
//         newBot.incrementCurrent();
//       } else {
//         if (!newBot.checkShouldStop())
//           handleShouldStopFalse(newBot, data.chatRoom, io);
//         else handleShouldStopTrue(newBot, data.chatRoom, io, newBot.ans);
//       }
//     });
//   });
// };

class ChatBot {
  constructor(chatRoom) {
    this.question = {};
    this.chatRoom = chatRoom;
    this.urls = api().diagnosis;
    this.evidence = [];
    this.stop;
    this.triage;
    this.age;
    this.gender;
    this.headers = {
      "content-type": "application/json",
      "APP-ID": "347f22ef",
      "App-Key": "981911ee7b91e67e79effcfd315fe18e",
    };
  }
  fetchDataForBot(evidence) {
    let newAge = parseInt(this.age);
    let newData = { sex: this.gender, age: newAge, evidence: evidence };
    return axios.post(this.urls, newData, {
      headers: this.headers,
    });
  }
  handleStop() {
    let newAge = parseInt(this.age);
    let newData = { sex: this.gender, age: newAge, evidence: this.evidence };
    return axios
      .post(api().triage, newData, {
        headers: this.headers,
      })
      .then((data) => {
        {
          this.triage = data.data;
        }
      });
  }
  handleGroupMultiple(data) {
    this.question.text = data.text;
    this.question.type = data.type;
    this.question.items = [];
    data.items.forEach((item) => {
      let newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      this.question.items.push(newItem);
    });
  }
  handleSingle(question) {
    this.question.text = question.text;
    this.question.type = question.type;
    this.question.items = [];
    question.items.forEach((item) => {
      let newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      this.question.items.push(newItem);
    });
  }
  async transformDataToQuestion(data, type) {
    this.stop = data.should_stop;
    if (!this.stop) {
      if (type == "group_multiple") this.handleGroupMultiple(data.question);
      if (type == "single") this.handleSingle(data.question);
      if (type == "group_single") this.handleSingle(data.question);
    } else {
      await this.handleStop();
    }
  }
  matchChoiceToValue(value) {
    if (value) return "present";
    else return "absent";
  }
  handleEvidence(data) {
    this.evidence = [];
    data.forEach((element) => {
      let choice_id = this.matchChoiceToValue(element.value);
      this.evidence.push({ id: element.id, choice_id: choice_id });
    });

    if (!this.stop) {
      return this.fetchDataForBot(this.evidence).then(async (res) => {
        if (res.data.question)
          this.transformDataToQuestion(res.data, res.data.question.type);
        else await this.transformDataToQuestion(res.data);
      });
    }
  }
  proccessData(data) {
    return this.handleEvidence(data.data);
  }
}

class ChatEngine {
  beginInitialRounds() {
    let self = this.chatBot;
    return this.chatBot.fetchDataForBot([]).then((data) => {
      self.transformDataToQuestion(data.data, data.data.question.type);
    });
  }

  connectionHandler = (socketServer) => {
    this.io = require("socket.io")(socketServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    let self = this;

    this.io.sockets.on("connection", function (socket) {
      socket.on("disconnect", function () {
        console.log("disconnected");
      });
      socket.on("persistingConnection", function (data) {});

      socket.on("joinChat", function (data) {
        socket.join(data.chatRoom);
        self.chatRoom = data.chatRoom;
        self.chatBot = new ChatBot(self.chatRoom);
        self.chatBot.gender = data.gender;
        self.chatBot.age = data.age;
        self.beginInitialRounds().then((data) => {
          self.io.in(self.chatRoom).emit("chatBotActivated", {
            data: self.chatBot.question,
            type: self.chatBot.question.type,
          });
        });
      });
      socket.on("sendAns", function (data) {
        self.chatBot.proccessData(data).then(() => {
          if (!self.chatBot.triage) {
            self.io.in(self.chatRoom).emit("setQuestion", {
              data: self.chatBot.question,
              type: self.chatBot.question.type,
            });
          } else {
            self.io.in(self.chatRoom).emit("triage", {
              data: self.chatBot.triage,
              type: "triage",
            });
          }
        });
      });
    });
  };
}

module.exports.chatSockets = function (socketServer) {
  let newChatEngine = new ChatEngine();
  newChatEngine.connectionHandler(socketServer);
};
