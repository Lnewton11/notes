var http = require('http');

// returns null if no push token found
function getPushTokenForUser(username) {
	// ...
}

function actuallySendMessage(token, ticker, text, username, profilePicUrl) {
	var options = {
		host: 'https://api.kik.com',
		path: '/push/v1/send'
	};

	var req = http.request(options, function() {
		console.log('sent cards push notification');
	});

	// note: timestamp is in milliseconds since epoch
	var pushData = {
		token: token,
		ticker: ticker,
		data: {
			timestamp: (+new Date()),
			text: text,
			username: username,
			profilePicUrl: profilePicUrl,
		}
	};

	req.write(JSON.stringify(pushData));
	req.end();
}

exports.uploadUserData = function(username, pushToken, profilePicUrl, displayName, callback) {

};

// 'to' is an array of usernames
// callback is a function that takes a single parameter - an array of usernames of users who were unable to receive the message
exports.sendMessage = function(from, to, content, callback) {
	var unregisteredUsers = [];

	to.forEach(function(username) {
		var pushToken = getPushTokenForUser(username);

		if (!pushToken) {
			unregisteredUsers.push(username);
		}
		else {
			actuallySendMessage(pushToken, 'message received from ' + from);
		}
	});

	callback(unregisteredUsers);
};