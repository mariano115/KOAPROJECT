const productModel = require("../../models/Products.model");
const { loggerDeclaration } = require("../../tools/utils");
const logger = loggerDeclaration();

module.exports = class ProductMongoDb {
  constructor() {}

  async find() {
    return await productModel.find();
  }

  async getProductById(id) {
    try {
      return await productModel.findById(id);
    } catch (error) {
      logger.warn("error in get product method getProductById");
      return { error: "error in get product" };
    }
  }

  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      logger.warn("error in creating product method addProduct");
      return { error: "error in creating product" };
    }
  }

  async deleteProductById(id) {
    try {
      return await productModel.deleteOne({ _id: id });
    } catch (error) {
      logger.warn("error in deleting product method deleteProductById");
      return { error: "error in deleting product" };
    }
  }

  async updateProductById(id, product) {
    try {
      return await productModel.findByIdAndUpdate(
        { _id: id },
        { ...product },
        { returnOriginal: false }
      );
    } catch (error) {
      logger.warn("error in modify product method updateProductById");
      return { error: "error in modify product" };
    }
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new ProductMongoDb();
    }
    return this.instance;
  }
};
