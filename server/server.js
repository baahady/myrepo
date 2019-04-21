const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicpath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
	console.log('user');

	socket.emit('newMessage',{
		from: 'Admin',
		text: 'welcome to chatroom',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage',{
		from: 'Admin',
		text: 'new user joind chatroom',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage',(message,callback)=>{
		console.log('createMessage',message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});

	socket.on('disconnect',()=>{
		console.log('a user disconnected');
	});
});

server.listen(port,()=>{
	console.log(`server is running on port ${port}`);
});
