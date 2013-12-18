usernames =  [ { username : 'name1'}, { username : 'name2' }];

users = [ { username : 'name1'}, { username : 'notaname' }, { username : 'name2' }, { username : 'name3' }];


// Our new returned users
users.forEach(function (user) {
	// Go through existing array
	// If the user is not in the array, add it
	is_match = false;

	usernames.forEach(function (comparison_user) {
		if ( user.username === comparison_user.username ) {
			is_match = true;
		}
	});

	if (is_match === false){ 
		usernames.push( user );
	}
});

 