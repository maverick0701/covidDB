const express = require("express");
const router = express.Router();
const index_controller = require("../controller/index");
router.get("/states", index_controller.getStates);
router.get("/getState", index_controller.getByStateName);
module.exports = router;
