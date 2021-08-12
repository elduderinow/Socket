const port = 8080;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);


const io = require("socket.io")(server, {
    cors: {
        origins: ["http://localhost:8080"]
    }
});

app.get('/', (res, res) => {
    res.send('hello world')
})

let userList = new Map();



let counter = 0;

io.on('connection', (socket) => {
    counter++;
    console.log(counter + "  someone connected");
    //socket.emit('test event', 'here is some data');


    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });
});

server.listen(port, () => {
    console.log("socket.io server is listening on port " + port)
})