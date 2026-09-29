const express = require('express');
const queue_router = express.Router();
const queue_controller = require("../controllers/queue_controller");

queue_router.get("/" , queue_controller.getQueues);
queue_router.get("/queues/:queueid" , queue_controller.getQueues);
queue_router.post("/queues/:queueid/join" , queue_controller.postQueues);
queue_router.get("/queues/:queueid/status/:token" , queue_controller.getQueuesStatus);
queue_router.delete("/queues/:queueid/tokens/:token" , queue_controller.leaveQueues);
queue_router.post("/queues/:queueid/next" , queue_controller.callNext);
queue_router.delete("/queues/:queueid/tokens/:token/skip" , queue_controller.skipToken);
module.exports = queue_router;