const cartModel = require("../../models/Cart.model");
const logger = loggerDeclaration();

module.exports = class CartMongoDb {
  constructor() {}

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      logger.warn(error);
      return { error: "error in getting all carts" };
    }
  }

  async getCartById(id) {
    try {
      return await cartModel.findById(id);
    } catch (error) {
      logger.warn(error);
      return { error: "error in getting cart by id" };
    }
  }

  async createEmptyCart(email, address) {
    try {
      return await cartModel.create({
        email,
        date: new Date().toISOString(),
        items: [],
        address,
      });
    } catch (error) {
      logger.warn(error);
      return { error: "error in creating cart" };
    }
  }

  async addProductToCart(idCart, productToAdd, cantidad) {
    try {
      const cart = await cartModel.updateOne(
        { _id: idCart },
        {
          $push: { items: { product: productToAdd, quantity: cantidad } },
        }
      );
      if (cart.modifiedCount > 0) {
        logger.info("se pudo agregar el producto al carrito");
        return "El producto fue agregado correctamente";
      } else {
        logger.info("No se pudo agregar el producto al carrito");
        return "No se pudo agregar el producto al carrito";
      }
    } catch (error) {
      logger.warn(error);
      return { error: "Hubo un problema al agregar el producto al carrito" };
    }
  }

  async deleteCartById(id) {
    try {
      return await cartModel.deleteOne({ _id: id });
    } catch (error) {
      logger.warn(error);
      return { error: "error in deleting cart" };
    }
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new CartMongoDb();
    }
    return this.instance;
  }
};
