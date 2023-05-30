const colors = require('colors');
const express = require('express');

const server = express();

server.get("/", (req, res) =>{
    res.send("Hello World!");
})


const port = 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
