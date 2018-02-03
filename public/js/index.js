var socket = io();

socket.on('connection', (message)=>{
    console.log(message);
})

socket.on('disconnect',()=>{
    console.log('disconnected from the server')
})

socket.on('newMessage',function(message){
    console.log('new message : ', message);
    var li = $('<li>',{text: `${message.from} : ${message.text}`});
    $('#messages').append(li);
});

$('#message-form').submit(function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },function(){

    })
})