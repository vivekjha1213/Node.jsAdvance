const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

//Socket.io..

io.on("connection", (socket) => {
    console.log("The User Connected", socket.id);
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});