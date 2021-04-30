const express = require("express");
const router = express.Router();
const index_controller = require("../controller/index");
const tweets_controller = require("../controller/twtController");
const cors = require("cors");
router.get("/states", cors(), index_controller.getStates);
router.get("/getState", cors(), index_controller.getByStateName);
router.get("/getIndiaSeriesData", cors(), index_controller.getInidaSeriesData);
router.get("/getStateSeriesData", cors(), index_controller.getStateSeriesData);
router.get("/getDistrictData", cors(), index_controller.districtWiseData);

router.get("/getTweets", cors(), tweets_controller.getAllTweets);

module.exports = router;
