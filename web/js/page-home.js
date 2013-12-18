App.populator('home', function (page, data) {
		
	var convo_list = $(page).find('.history');
		sent_convo_template = $(page).find('.sent-convo').remove(),
		convo_template = $(page).find('.convo').remove();

	var test_users = [{username:"test_user_4", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 4", firstName:"Test", lastName:"User 4"},{username:"test_user_3", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 3", firstName:"Test", lastName:"User 3"},{username:"test_user_2", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 2", firstName:"Test", lastName:"User 2"},{username:"test_user_1", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 1", firstName:"Test", lastName:"User 1"}],
		test_data = [{timestamp: '20 min'}]; 

	function make_convo(data) {
		var new_convo = convo_template.clone();

		new_convo.find('.name').text(data.full_name);

		if (data.has_read) {
			new_convo.find('.state-icon').css('background-image', 'url(/img/small-expired.png)');
			new_convo.find('.expired-text').text('Expired message');
		} else {
			new_convo.find('.state-icon').css('background-image', 'url(/img/small-unread.png)');
			new_convo.find('.expired-text').text('Unread message');
		}

		new_convo.clickable().on('click', function () {
			if (data.has_read) {
				//TODO
				App.dialog({
					title: 'Too fucking bad',
					text: 'Seriously',
					cancelButton: 'My bad'
				});
			} else {
				//TODO: go to the message
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

	function make_sent_convo(users_sent_to, dataz) {

		var new_convo = sent_convo_template.clone(),
			list_of_pictures = new_convo.find('.picture-list');


		users_sent_to.forEach(function (user) {
			var pic = make_tiny_circle(user.thumbnail);
			list_of_pictures.append(pic);
		});

		new_convo.find('.sent-timestamp').text(dataz.timestamp);
		console.log(dataz.timestamp);
		new_convo.find('.sent-text').text('Sent to ' + users_sent_to.length + ' People');

		cards.kik.getUser(function (user) {
			new_convo.find('.img').css('background-image', 'url(' + user.pic + ')');
		});
		//new_convo.find('.picture-list').children(list_of_pictures);
		// add list_of_pictures as a child of new_convo

		return new_convo;
	}

	function populate_message_history ( convo_info ) {
		convo_info.forEach(function ( message ) {
			var new_convo = make_convo(message);
			convo_list.prepend(new_convo);
		})
	}

	// check if we came from $('send').on('click') => page-send
	// if so, we need to add a new sent message to the top of the list
	// if ( data.has_sent_message ) {
	// 	var new_sent_convo = make_sent_convo(data.userlist);
	// 	convo_template.prepend(new_sent_convo);
	// }


	// API.get_message_history( function (messages) {
	// 	populate_message_history(messages);
	// });

	convo_list.prepend( make_sent_convo(test_users, test_data) );
	convo_list.prepend( make_sent_convo(test_users, test_data) );

	populate_message_history([{
		full_name: 'Douche Bag',
		thumbnail: 'http://d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg',
		has_read: false,
		timestamp: '5 min'
	}, {
		full_name: 'Douche Jones',
		thumbnail: 'http://d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg',
		has_read: true,
		timestamp: '10 min'
	}]);

	convo_list.prepend( make_sent_convo(test_users, test_data) );
	convo_list.prepend( make_sent_convo(test_users, test_data) );
});

// {
// 	'full_name' : 'something',
// 	'thumbnail' : 'a_link',
// 	'has_read' : boolean,
// 	'timestamp' : DateTime
// }