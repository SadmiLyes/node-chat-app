var socket = io();
var locationButton = $('#send-location');

socket.on('connection', (message) => {
    console.log(message);
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('updateUserList',function(users){
    console.log('Users List : ', users);
    var ol = $('<ol>');
    users.forEach(function(user){
        ol.append($('<li>',{text: user}))
    })
    $('#users').html(ol);
})


socket.on('newMessage', function (message) {
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
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

socket.on('connect',function(){
    var params = $.deparam(location.search);

    socket.emit('join', params,function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    });
})

function scrollToBottom() {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}