if (cards.kik.hasPermission()){
	App.load('home');
}
else {
	App.load('welcome');
}
