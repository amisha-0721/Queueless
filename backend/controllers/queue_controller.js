const queues = require("../models/queue_model");

const getQueues = (req,res) =>{
    const queueid = Number(req.params.queueid);
    const specified_queue = queues.find((queue => queue.id === queueid));
    if (!specified_queue) {
        res.status(404).json("Page Not Found");
        return;
    }
    res.json(specified_queue);
}

module.exports = getQueues;