var socket = io();

socket.on('connect', ()=>{
    console.log('Connected to the server')
})

socket.on('disconnect',()=>{
    console.log('disconnected from the server')
})
/*
socket.on('newEmail', function(email){
    console.log('New email',email);
})

socket.emit('createEmail',{
    to: 'jen@gmail.com',
    text:'Hey, this lyes'
});*/

socket.on('newMessage',function(newMessage){
    console.log('new message : ', newMessage);
});

