var Messages = function () {
	var Messages = cards.events({
		save: saveMessage,
		get : getMessageList,
		clear: clearMessageList,
		markAsRead: markMessageAsRead
	});
	return Messages;


	function saveMessage(message) {
		var messages = getMessageList();
		messages.unshift(message);
		storeMessages(messages);
	}

	function markMessageAsRead(message) {
		if ( !message.id ) {
			return;
		}

		var messages = getMessageList();
		for (var i=0, l=messages.length; i<l; i++) {
			if (message.id === messages[i].id) {
				messages[i].has_read = true;
				storeMessages(messages);
				return;
			}
		}
	}

	function getMessageList() {
		if (localStorage['messages']) {
			try {
				return JSON.parse(localStorage['messages']);
			} catch (err) {}
		}
		return [];
	}

	function clearMessageList() {
		storeMessages([]);
	}

	function storeMessages(messages) {
		localStorage['messages'] = JSON.stringify(messages);
		Messages.trigger('message');
	}
}();
