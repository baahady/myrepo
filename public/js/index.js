	var socket = io();

	socket.on('connect',function(){
		console.log('connected to server');

		socket.emit('createdEmail',{
			from: 'bahram@bahram.com',
			text: 'text from user',
			createdAt: 123
		});
	});

	socket.on('disconnect',function(){
		console.log('disconnected from server');
	});

	socket.on('newEmail',function(email){
		console.log('new email',email);
	});