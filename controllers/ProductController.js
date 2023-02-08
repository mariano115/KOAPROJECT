const ProductService = require("../service/ProductsService");

const getProducts = async (req, res) => {
  res.send(await ProductService.getProducts());
};

const getProductById = async (req, res) => {
  res.send(await ProductService.getProductById(req.params.id));
};

const addProduct = async (req, res) => {
  res.send(await ProductService.addProduct(req.body));
};

const deleteProductById = async (req, res) => {
  res.send(await ProductService.deleteProductById(req.params.id));
};

const updateProductById = async (req, res) => {
  res.send(await ProductService.updateProductById(req.params.id, req.body));
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
