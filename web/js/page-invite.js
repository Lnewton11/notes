App.populator('invite', function (page, data) {

	var invite_contact = $(page).find('.contact').remove(), 
		contact_list = $(page).find('.contacts-list');

	var test_users = [{username:"test_user_4", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 4", firstName:"Test", lastName:"User 4"},{username:"test_user_3", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 3", firstName:"Test", lastName:"User 3"},{username:"test_user_2", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 2", firstName:"Test", lastName:"User 2"},{username:"test_user_1", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 1", firstName:"Test", lastName:"User 1"}];

	function make_contact (user){
		var new_contact = invite_contact.clone();

		//getUser only gets info from users who have given permission, any other way to get name and thumbnail from a username? 
		//this info is stored in the usernames array with the selected/sent to users, forEach through usernames and check if username given === .username, if so return thumbnail and full name.
		new_contact.find('.name').text(user.fullName);
		new_contact.find('.contact-img').css('background image', 'url(' + user.thumbnail + ')');

		var inviteButton = new_contact.find('.invite-button');
		inviteButton.clickable().on('click', function () {
			console.log('clicked');
			cards.kik.getUser(function (user) {
				cards.kik.send(user.username, {
					title: 'Float',
					text: user.firstName + ' is inviting you to join them on Float! It\'s a great card that lets you send disappearing messages to your friends',
					pic: '/img/biglogonew.png'
				});
				console.log('sent?');
			});
		});

		return new_contact;
	}

	function populate_contact_list ( contact_info ) {
		contact_info.forEach(function ( contact ) {
			var new_contact = make_contact(contact);
			contact_list.append(new_contact);
		}); 
	}

	populate_contact_list(test_users);
});