	var socket = io();

	socket.on('connect',function(){
		console.log('connected to server');
	});

	socket.on('disconnect',function(){
		console.log('disconnected from server');
	});

	socket.on('newMessage',function(message){
		console.log('newMessage',message);
		var li = jQuery('<li></li>');
		li.text(`${message.from}: ${message.text}`);
		jQuery('#messages').append(li);
	});

	socket.on('newLocationMessage',function(message){
		var li = jQuery('<li></li>');
		var a = jQuery('<a target="_blank">Location</a>');
		li.text(`${message.from}: `);
		a.attr('href',message.url);
		li.append(a)
		jQuery('#messages').append(li);
	});

	jQuery('#message-form').on('submit',function(e){
		e.preventDefault();

		var messageTexBox = jQuery('[name=message]');

		socket.emit('createMessage',{
			from: 'User',
			text: messageTexBox.val()
		},function(){
			messageTexBox.val('')
		});
	});

	var locationButton = jQuery('#send-location');
	locationButton.on('click',function(){
		if(!navigator.geolocation){
			return alert('geolocation not supported by your browser');
		}

		locationButton.attr('disabled','disabled').text('sending location...');

		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('send location');
			socket.emit('createLocationMessage',{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},function(){
			locationButton.removeAttr('disabled').text('send location');
			alert('unable to fetch data position');
		});
	});






