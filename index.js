var express = require('express');
var app = express();
var http = require('http');
var { Server } = require('socket.io');
var server = http.createServer(app);
var io = new Server(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get(/^\/order-\d+$/, function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

/* io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
}) */

io.of(/^\/order-\d+$/).on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        const namespace = socket.nsp.name;
        io.of(namespace).emit('chat message', msg)
    })
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
})