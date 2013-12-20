if (cards.kik.hasPermission()){
	App.load('home');
} else {
	App.load('welcome');
}

if (cards.push) {
	cards.push.handler(function (message) {
		console.log('INCOMING PUSH!');
		console.log(JSON.stringify(message));
		Messages.save(message);
	});
}