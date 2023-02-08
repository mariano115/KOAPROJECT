const productDTO = (product) => {
	return {
		id: product.id,
		description: product.description,
		price: product.price,
        category: product.category,
        photo: product.photo
	};
};

module.exports = productDTO;