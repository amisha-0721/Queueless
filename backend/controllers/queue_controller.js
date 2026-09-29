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
            res.status(404).json("Queue Not Found");
            return;
        }
        const token = specified_queue.token+1;
        specified_queue.token = token;
        specified_queue.waiting.push(token);
        res.json(specified_queue);   
    },

    getQueuesStatus : (req,res) =>{
        const queueid = Number(req.params.queueid);
        const token = Number(req.params.token);
        const specified_queue = queues.find((queue => queue.id === queueid));
         if (!specified_queue) {
            res.status(404).json("Queue Not Found");
            return;
        }
        const waiting  = specified_queue.waiting;
        const current_token = specified_queue.current_token;
        const position = waiting.indexOf(token) +1;
        const people_ahead = waiting.indexOf(token);
        let status;
        if (token === current_token) {
            status = "serving";
        } else if (position != 0) {
            status = "waiting";
        } else{
            res.status(404).json("Token not Found");
            return;
        }
        res.json({token , current_token , people_ahead, position , status});
    },

    leaveQueues :(req,res) =>{
        const queueid = Number(req.params.queueid);
        const token = Number(req.params.token);
        const specified_queue = queues.find((queue => queue.id === queueid));
        if (!specified_queue) {
            res.status(404).json("Queue Not Found");
            return;
        }
        const waiting  = specified_queue.waiting;
        const index = waiting.indexOf(token);
        if (index === -1) {
            res.status(404).json("Token Not Found");
            return;
        }
        waiting.splice(index,1);
        res.json(specified_queue);
    },

    callNext : (req,res) =>{
        const queueid = Number(req.params.queueid);
        const specified_queue = queues.find((queue => queue.id === queueid));
        if (!specified_queue) {
            res.status(404).json("Queue Not Found");
            return;
        }
        const waiting = specified_queue.waiting;
        if (waiting.length === 0) {
            res.json("No one is in the waiting queue");
            return;
        }
        const next = waiting[0];
        specified_queue.current_token = next;
        waiting.shift();
        res.json(specified_queue);
    },

    skipToken : (req,res) =>{
        const queueid = Number(req.params.queueid);
        const token = Number(req.params.token);
        const specified_queue = queues.find((queue => queue.id === queueid));
        if (!specified_queue) {
            res.status(404).json("Queue Not Found");
            return;
        }
        const waiting = specified_queue.waiting;
        const index = waiting.indexOf(token);
        if (index === -1) {
            res.status(404).json("Token not Found");
            return;
        }
        waiting.splice(index,1);
        res.json(specified_queue);
    },
};

module.exports = queue_controller;