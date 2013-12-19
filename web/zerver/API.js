var redis = require('redis-url')
	        .connect(process.env.REDISTOGO_URL)
	        .on('connect', function () {})
	        .on('error', function () {});

var cards = require('kik-cards');

/*
	Dear Mike,
	Welcome to Redis in NodeJS.

	redis.get('fuck', function (err, data) {
		if (err) {
			// aww shit
		} else {
			// fuck yea!
		}
	});

	redis.set('fuck', 'face', function (err) {
		if (err) {
			// god damn..
		}
	});

	Note that it is very important to have the callback in redis.set.
	This insures that synchronous exceptions are not thrown by the
	library because that would bring down the server.
*/


// callback can take single error parameter (which may be null)
exports.uploadUserData = function(username, pushToken, profilePicUrl, displayName, expiryTime, callback) {
	redis.hmset(
		username, 
		{
			pushToken: pushToken,
			profilePicUrl: profilePicUrl,
			displayName: displayName,
			expiryTime: expiryTime
		},
		function(err) {
			if (err) {
				console.log('failed to set user data: ' + err);
				callback('Failed to persist user data. Try again later.');
			}
			else {
				console.log('set user data for user ' + username);
				callback(null);
			}
		});
};

// 'to' is an array of usernames
// callback is a function that takes 2 parameters - err (error, which is null if successful) and an array 
// of usernames which were not successfully sent to (ie. if the push failed or they haven't registered with float)
exports.sendMessage = function(from, to, content, callback) {
	var unregisteredUsers = [];

	var usersToPushTo = to.length;

	to.forEach(function(username) {
		redis.hgetall(username, function(err, userData) {
			if (err) {

			}
			else {
				var payload = {}; // TODO populate me with message, timestamp, expiry time, etc.
				cards.push.send(userData.pushToken, 'message from ' + username, payload, function(err, shouldDeleteToken) {

				});
			}
		});

		if (!pushToken) {
			unregisteredUsers.push(username);
		}
		else {
			actuallySendMessage(pushToken, 'message received from ' + from);
		}
	});

	callback(unregisteredUsers);
};