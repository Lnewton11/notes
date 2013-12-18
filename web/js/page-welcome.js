App.populator('welcome', function (page) {
	var login_button = $(page).find('.login');

	login_button.on('click', function () {
		cards.kik.getUser(function (user) {
			var hasAccepted = user;

			if (! hasAccepted){
				return;
			}
			App.load('home');
		});
	});
});