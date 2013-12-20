App.populator('home', function (page, data) {
	var convo_list = $(page).find('.history');
		sent_convo_template = $(page).find('.sent-convo').remove(),
		convo_template = $(page).find('.convo').remove();
		message = $(page).find('.message');

	cards.kik.getUser(function (user) {
		cards.push.getToken(function (token) {
			cards.ready(function () {
				if (user && token) {
					API.uploadUserData(user.username, token, user.thumbnail, user.fullName, function(){});
				}
			});
		});
	});
		
	renderMessageList();
	Messages.on('message', function (message) {
		renderMessageList();
	});

	//TODO: actually make this button exist
	$(page).find('.clear-messages').click(function () {
		Messages.clear();
	});



	function make_convo(data) {
		var new_convo = convo_template.clone();

		new_convo.find('.name').text(data.full_name);

		if (data.has_read) {
			new_convo.find('.state-icon').css('background-image', 'url(/img/small-expired.png)');
			new_convo.find('.expired-text').text('Expired message');
		} else {
			new_convo.find('.state-icon').css('background-image', 'url(/img/small-unread.png)');
			new_convo.find('.expired-text').text('Unread message, Tap to view');
		}

		new_convo.clickable().on('click', function () {
			if (data.has_read) {
				App.dialog({
					title: 'Message has Expired',
					okButton: 'OK'
				});
			} else {
				App.load('message', data);
				console.log('load');
			}
		});

		new_convo.find('.img').css('background-image', 'url(' + data.thumbnail + ')');
		new_convo.find('.timestamp').text(data.timestamp);
		return new_convo;
	}

	function make_tiny_circle( thumbnail ) {
		var tiny_pic = $('<div class="tiny-pic">');
		tiny_pic.css('background-image', 'url(' + thumbnail + ')');
		return tiny_pic;
	}

	function make_sent_convo(message) {

		var new_convo = sent_convo_template.clone(),
			list_of_pictures = new_convo.find('.picture-list');


		message.users.forEach(function (user) {
			var pic = make_tiny_circle(user.thumbnail);
			list_of_pictures.append(pic);
		});

		new_convo.find('.sent-timestamp').text(message.timestamp);
		console.log(message.timestamp);
		new_convo.find('.sent-text').text('Sent to ' + message.users.length + ' People');

		cards.kik.getUser(function (user) {
			new_convo.find('.img').css('background-image', 'url(' + user.pic + ')');
		});

		return new_convo;
	}

	function populate_message_history ( convo_info ) {
		convo_info.forEach(function ( message ) {
			var new_convo = make_convo(message);
			convo_list.prepend(new_convo);
		});
	};

	function renderMessageList() {
		var messages = Messages.get();

		convo_list.empty();

		messages.forEach(function (message) {
			if (message.isSent) {
				var convo = make_sent_convo(message);
			} else {
				var convo = make_convo(message);
			}
			convo_list.append(convo);
		});
	}
});
