const express = require('express');
const queue_router = express.Router();
const queue_controller = require("../controllers/queue_controller");

queue_router.get("/" , queue_controller.getQueues);
queue_router.get("/queues/:queueid" , queue_controller.getQueues);
queue_router.post("/queues/:queueid/join" , queue_controller.postQueues);

module.exports = queue_router;