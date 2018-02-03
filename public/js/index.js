var socket = io();
var locationButton = $('#send-location');

socket.on('connection', (message) => {
    console.log(message);
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li>', {text: `${message.from} ${formattedTime} : ${message.text}`});
    $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li>',{text: `${message.from} ${formattedTime} :`}).append($('<a>',{href:message.url,text: `My Current Location`,target:'_blank'}));
    $('#messages').append(li);
})

$('#message-form').submit(function (e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
});

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser');
    }
locationButton.attr('disabled','true').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(){
        alert('Unable to find location');
        locationButton.removeAttr('disabled').text('Send Location');
    })
})