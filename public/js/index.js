var socket = io();

socket.on('connection', (message) => {
    console.log(message);
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newMessage', function (message) {
    console.log('new message : ', message);
    var li = $('<li>', {text: `${message.from} : ${message.text}`});
    $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var li = $('<li>',{text: `${message.from} :`}).append($('<a>',{href:message.url,text: `My Current Location`,target:'_blank'}));
    $('#messages').append(li);
})

$('#message-form').submit(function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {
        $('[name=message]').val('')
    })
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(){
        alert('Unable to find location');
    })
})