App.populator('send', function (page) {
	var add_button = $(page).find('#add'),
	    send_button = $(page).find('#send'),
	    message_input = $(page).find('#message'),
	    timer = $(page).find('#timer'),
	    select_friends_template = $(page).find('#add'),
		usernames  = [],
	    pictures = [],
	    timer_value = 6;

	timer.clickable().bind('change', function (){
		timer_value = timer.find('#time-select').val();
		timer.css('background-image', 'url(/img/' + timer_value + '.png)');
		console.log("yo dog i'm a log " + timer.find('#time-select').val());
	});
/*

        Clickable(timer);
        timer.querySelector('select')
                .addEventListener('change', function () {
                        timer.querySelector('span').textContent = this.value;
                }, false);

                $('#timer select').clickable().bind('change', function() {

                });*/

	//timer.css('background-image', 'url(/img/' + timer_value + '.png)');

	$(page).on('appLayout', function () {
		//TODO
		message_input.width(window.innerWidth-93);
	});
	
	add_button.on('click', function () {
		cards.kik.pickUsers( { maxResults : 14, preselected : usernames }, function (users){
			if (!users){
				return;
			}
			users.forEach(function (user) {
				// Go through existing array
				// If the user is not in the array, add it
				is_match = false;

				usernames.forEach(function (comparison_user) {
					if ( user.username === comparison_user.username ) {
						console.log('user exists in array, skipping: ' + user.username);
						is_match = true;
					}
				});

				if (is_match === false) { 
					console.log('new user selected, adding to array: ' + user.username);
					usernames.push( user );
				}
				
			});
			select_friends_template.remove();
			console.log('STUFF: ' + JSON.stringify(users));
			console.log(usernames.length);
		});
	});

	send_button.on('click', function () {
		if (usernames.length === 0 ) {
			App.dialog({
				title: 'Error',
				text: 'Please select contacts',
				okButton: 'OK'
			});
			return;
		}
		if (message_input.val() === '') {
			App.dialog({
				title: 'Error',
				text: 'Please enter a message',
				okButton: 'OK'
			});
			return;
		}
		console.log(usernames);
		console.log(message_input.val());
		usernames = [];
		App.load('home', { 'has_sent_message' : true, 'userlist' : usernames })
	});
});
