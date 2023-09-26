const express = require('express');
const socketio = require("socket.io");
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname,"/public")))

io.on('connection',(socket)=>{
    console.log("connected")
    
    socket.emit('welcome','Welome to chalk board')

    socket.on("points",(data)=>{
         socket.broadcast.emit("draw",data)
    })
})

server.listen(port,()=>{
   console.log(`Server on port ${port}`)
})
