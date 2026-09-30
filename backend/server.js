const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const queue_router = require('./routes/queue_router');

app.get("/", (req, res) => {
    res.send("QueueLess Backend Running");
});
app.use(queue_router);

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});