const port = 8080;
const express = require("express");
const app = express();
const http = require("http");
// const clientPath = `${__dirname}/../client`;
// app.use(express.static(clientPath));


const server = http.createServer(app);
//let io = require('socket.io')(server);



const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});



io.on('connection', (socket) => {
    console.log('it fucking works');
    socket.emit('test event', 'here is some data');
});

server.listen(port, () => {
    console.log("socket.io server is listening on port " + port)
})