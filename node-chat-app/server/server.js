const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const _ = require('lodash');
const { Users } = require('./utils/users');

require('./config/config');
const { generateMessage, generateLocationMessage } = require('./utils/message')

const staticPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(staticPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} Left`));
        }
    })

    socket.on('join', (params, callback) => {
        if (_.isEmpty(params.name.trim()) || _.isEmpty(params.room.trim())) {
            callback('Name & Room are Required')
        }
        if (users && users.getSize() > 0) {
            users.getAllUsers().forEach(user => {
                if(user.name === params.name){
                    callback(`User is already active in Chat Room ${user.room}`)
                }
            });
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room)

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))

        socket.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined`))

        socket.emit('updateUsers', users.getUserList(params.room));
    })

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && !_.isEmpty(message.text.trim())) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback();
    })

    socket.on('createLocationMessage', (coords, callback) => {
        var user = users.getUser(socket.id);
        if (user && coords.latitude && coords.longitude) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        callback();
    })

})





server.listen(process.env.PORT, () => {
    console.log(`Started in port ${process.env.PORT}`);
})