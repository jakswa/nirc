function openConnection (options) {
	if (options.server == "" || options.nickname == "" || options.channel == "") {
		return error = "Fields marked with * are required";
	}
	else {
		var socket  		= io.connect(null);
		
		var connectForm = $('#connectForm');
		var ircStuff		= $('#ircStuff');
		var chatLog 		= $('#chatLog');
		var msgInput 		= $('#msgInput');
		
		function newMsg (from, message) {
			chatLog.append("<div class='line'>" + from + " => " + message + "</div>");
			chatLog.scrollTop(chatLog.height());
		}
		
		socket.on('connect', function () {	  
			socket.emit('connectToIRC', { options: options });
			
			connectForm.hide();
			ircStuff.show();
			
			socket.on('newMessage', function (data) {
				newMsg(data.from, data.message);
			});
			
			socket.on('clientDisconnected', function (data) {
			
			});
		});
		
		// client is trying to send a message
		msgInput.keypress(function (e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) { //Enter keycode  
				console.log("safd");
				if (msgInput.val() != "") {
					socket.emit('sendMsg', { message: msgInput.val() });
					newMsg("You", msgInput.val());
					msgInput.val('');
				}
			}
		});
	}
}