const ProductService = require("../service/ProductsService");

const getProducts = async (ctx, next) => {
  ctx.body = await ProductService.getProducts();
};

const getProductById = async (ctx, next) => {
  ctx.body = await ProductService.getProductById(ctx.params.id);
};

const addProduct = async (ctx, next) => {
  ctx.body = await ProductService.addProduct(ctx.request.body);
};

const deleteProductById = async (ctx, next) => {
  ctx.body = await ProductService.deleteProductById(ctx.params.id);
};

const updateProductById = async (ctx, next) => {
  ctx.body = await ProductService.updateProductById(
    ctx.params.id,
    ctx.request.body
  );
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
