const express = require("express");

const app = express();
const queue_router = require('./routes/queue_router');

app.use(queue_router);

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});