App.populator('invite', function (page, data) {

	var invitables = data.invitables,
		sendto = data.sendto,
		invite_contact = $(page).find('.contact').remove(), 
		contact_list = $(page).find('.contacts-list');


	//var test_users = [{username:"test_user_4", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 4", firstName:"Test", lastName:"User 4"},{username:"test_user_3", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 3", firstName:"Test", lastName:"User 3"},{username:"test_user_2", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 2", firstName:"Test", lastName:"User 2"},{username:"test_user_1", thumbnail:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/thumb.jpg", pic:"//d33vud085sp3wg.cloudfront.net/J5roT6QFsOfNFZjrYI4Vedxfpjk/orig.jpg", fullName:"Test User 1", firstName:"Test", lastName:"User 1"}];



	function make_contact (username){
		var new_contact = invite_contact.clone();
		
		sendto.forEach(function (contact){ 
			if (username === contact.username){
				new_contact.find('.name').text(contact.fullName);
				new_contact.find('.contact-img').css('background-image', 'url(' + contact.thumbnail + ')');
				console.log('match', contact.thumbnail, contact.fullName);
			}
		});

		var inviteButton = new_contact.find('.invite-button');
		inviteButton.clickable().on('click', function () {
			console.log('clicked');
			cards.kik.getUser(function (user) {
				cards.kik.send(username, {
					title: 'Float',
					text: user.firstName + ' is inviting you to join them on Float! It\'s a great card that lets you send disappearing messages to your friends',
					pic: '/img/biglogonew.png'
				});
				console.log('sent?');
			});
		});

		return new_contact;
	}

	function populate_contact_list (invitables) {
		invitables.forEach(function (username) {
			var new_contact = make_contact(username);
			contact_list.append(new_contact);
		}); 
	}

	populate_contact_list(invitables);
});