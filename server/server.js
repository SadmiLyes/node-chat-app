const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the chat',
        createdat: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user is connected'
        createdat: new Date().getTime()
    });

    socket.on('createMessage',(message)=>{
        console.log('Created Message : ', message);
        io.emit('newMessage',{
            from: newMessage.from,
            text: newMessage.text,
            createdat: new Date().getTime()
        })
/*        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            date : new Date().getTime()
        })*/
    });

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    })
})

server.listen(port, () => {
    console.log('Port :', port);
});


