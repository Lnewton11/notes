App.populator('message', function (page, data) {
	var isDead = false;
	$(page).on('appBack', function () {
		isDead = true;
	});

	this.ready(function () {
		Messages.markAsRead(data);
	});

	$(page).find('.app-message').text(data.text);
	setTime(data.lifeSpan);

	for (var i=data.lifeSpan-1; i>=0; i--) {
		(function (i) {
			setTimeout(function () {
				if (i !== 0) {
					setTime(i);
				} else {
					hideMessage();
				}
			}, (data.lifeSpan-i)*1000);
		})(i);
	}

	function setTime(sec) {
		$(page).find('.rec-timer').text(sec);
	}

	function hideMessage() {
		if (isDead) {
			return;
		}

		//TODO
		App.back();
	}
});