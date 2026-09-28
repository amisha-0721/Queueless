const queues = require("../models/queue_model");

const queue_controller = {

    getQueues : (req,res) =>{
        const queueid = Number(req.params.queueid);
        const specified_queue = queues.find((queue => queue.id === queueid));
        if (!specified_queue) {
            res.status(404).json("Page Not Found");
            return;
        }
        res.json(specified_queue);
    },
    postQueues : (req,res) =>{
        const queueid = Number(req.params.queueid);
        const specified_queue = queues.find((queue => queue.id === queueid));
        if (!specified_queue) {
            res.status(404).json("Page Not Found");
            return;
        }
        const token = specified_queue.token+1;
        specified_queue.token = token;
        specified_queue.waiting.push(token);
        res.json(specified_queue);   
    }
};

module.exports = queue_controller;