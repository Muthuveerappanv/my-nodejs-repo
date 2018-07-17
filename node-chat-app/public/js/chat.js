var socket = io();

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);
    console.log(params)
    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {

        }
    })
})

socket.on('disconnect', () => {
    console.log('Disconnected from Server');
})

socket.on('updateUsers', (users) => {
    var ol = jQuery('<ol></ol>');
    users.forEach(user => {
        var li = jQuery('<li></li>').text(user);
        ol.append(li);
    });
    jQuery('#users').append(ol);
})


jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    var messageTxtBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text: messageTxtBox.val()
    }, () => {
        messageTxtBox.val('');
    })
})

var geolocation = jQuery('#send-location');

geolocation.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser!')
    }
    geolocation.prop("disabled", true).text("Sending Location...")
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        geolocation.prop("disabled", false).text("Send Location")
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {

        })
    }, (error) => {
        geolocation.prop("disabled", false).text("Send Location")
        console.log(error);
    });
})


socket.on('newMessage', (message) => {
    message.createdAt = moment(message.createdAt).format('M/D hh:mm');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, { message });
    jQuery('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', (location) => {
    location.createdAt = moment(location.createdAt).format('M/D hh:mm');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, { location });
    jQuery('#messages').append(html);
    scrollToBottom();
})

var scrollToBottom = () => {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMsgHt = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMsgHt >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}