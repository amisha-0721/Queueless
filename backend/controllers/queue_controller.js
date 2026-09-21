const queues = require("../models/queue_model");

const getQueues = (req,res) =>{
    res.json(queues);
}

module.exports = getQueues;