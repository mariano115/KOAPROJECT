const messageDTO = (message) => {
	return {
		id: message.id,
		email: message.email,
		text: message.text,
        date: message.date
	};
};

module.exports = messageDTO;