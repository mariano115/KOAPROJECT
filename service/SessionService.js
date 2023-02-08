const { createHash, getDataUser } = require("../tools/utils");
const UserService = require("./UserService");
const { getCartById, generatePurchaseSummary } = require("./CartService");
const enviarMail = require("../tools/mails");
const Config = require("../config");

const register = async (newUser) => {
  try {
    const hashPassword = createHash(newUser.password);
    newUser.password = hashPassword;
    if (await UserService.createUser(newUser)) {
      return "Usuario Creado";
    } else {
      return "No se pudo crear el usuario";
    }
  } catch (error) {
    return "Hubo un problema al crear el usuario";
  }
};

const finishBuy = async (carrito) => {
  try {
    const cart = await getCartById(carrito.idCarrito);
    const user = await getDataUser(cart.email);
    const emailText = await generatePurchaseSummary(cart);
    enviarMail(
      Config.emailAdmin,
      "nuevo pedido de " + user.name + " " + user.email,
      emailText
    );
    return "El pedido fue confirmado";
  } catch (error) {
    return error;
  }
};

module.exports = { register, finishBuy };
