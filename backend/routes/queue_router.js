const express = require('express');
const queue_router = express.Router();
const queue_controller = require("../controllers/queue_controller");

queue_router.get("/" , queue_controller);

module.exports = queue_router;