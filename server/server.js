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


let userList = new Map();

let count = 0
io.on('connection', (socket) => {
    //console log + increment to see who is connected
    count++
    console.log(count + ' someone connected');

    //get the username, when initiating connection, this is empty
    // use ternary if else and only add user when the username is filled in
    let userName =  socket.handshake.query.userName;
    userName ? addUser(userName, socket.id) : "";


    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);


    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message:msg, userName:userName});
    })


    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id)
    })

});

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        if (userIds.size === 0) {
            userList.delete(userName);
        }
    }
}

server.listen(port, () => {
    console.log("socket.io server is listening on port " + port)
})