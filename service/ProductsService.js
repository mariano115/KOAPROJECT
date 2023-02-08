const productsModel = require("../models/Products.model");
const { loggerDeclaration } = require("../tools/utils");
const MyConnectionFactory = require("../DAOs/ProductDao/ProductFactoryDAO");
const productDTO = require("../DTOs/ProductDTO");
const connectionDbb = new MyConnectionFactory().returnDbConnection();
const logger = loggerDeclaration();

const getProducts = async () => {
  try {
    const products = await connectionDbb.find();
    return products.map((product) => productDTO(product));
  } catch (error) {
    logger.warn("error in get product method getProductById");
    return { error: "error in get products" };
  }
};

const getProductById = async (id) => {
  return productDTO(await connectionDbb.getProductById(id));
};

const addProduct = async (product) => {
  if (
    product.description !== undefined &&
    product.description.trim() !== "" &&
    product.description !== null &&
    product.price !== undefined &&
    product.price !== "" &&
    product.price !== null &&
    product.category !== undefined &&
    product.category.trim() !== "" &&
    product.category !== null &&
    product.photo !== undefined &&
    product.photo.trim() !== "" &&
    product.photo !== null
  ) {
    return await connectionDbb.addProduct(product);
  } else {
    logger.warn("error in creating product method addProduct");
    return { error: "error in creating product" };
  }
};

const deleteProductById = async (id) => {
  return await connectionDbb.deleteProductById(id);
};

const updateProductById = async (id, product) => {
  return await connectionDbb.updateProductById(id, product);
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
