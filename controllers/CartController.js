const cartModel = require("../models/Cart.model");
const cartService = require("../service/CartService");

const getCarts = async (ctx, next) => {
  ctx.body = await cartService.getCarts();
};

const getCartById = async (ctx, next) => {
  ctx.body = await cartService.getCartById(ctx.params.id);
};

const generatePurchaseSummary = async (cart) => {
  return await cartService.generatePurchaseSummary(cart);
};

const addProductToCart = async (ctx, next) => {
  ctx.body = await cartService.addProductToCart(
    ctx.request.body.idProducto,
    ctx.request.body.idCarrito,
    ctx.request.body.cantidad
  )
};

const deleteCartById = async (ctx, next) => {
  ctx.body = await cartService.deleteCartById(ctx.params.id)
}

const createEmptyCart = async (email, address) => {
  ctx.body = await cartModel.create({
    email,
    date: new Date().toISOString(),
    items: [],
    address,
  });
};

module.exports = {
  deleteCartById,
  getCartById,
  addProductToCart,
  createEmptyCart,
  generatePurchaseSummary,
  getCarts,
};
