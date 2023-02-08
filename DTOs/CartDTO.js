const cartDTO = (cart) => {
	return {
		id: cart.id,
		email: cart.email,
		items: cart.items,
		address: cart.address,
        date: cart.date
	};
};

module.exports = cartDTO;