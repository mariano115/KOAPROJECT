const enviarMail = require("../tools/mails");
const {
  loggerDeclaration,
  downloadPicAndSaveInAvatars,
} = require("../tools/utils");
const logger = loggerDeclaration();
const Config = require("../config");
const MyConnectionFactory = require("../DAOs/UserDao/UserFactoryDAO")
const connectionDbb = (new MyConnectionFactory).returnDbConnection()

const createUser = async (userToCreate) => {
  try {
    if ((await connectionDbb.findUserByEmail(userToCreate.email)) == null) {
      const newPhotoPath = `${Config.publicAvatarsUrl}${userToCreate.email}.jpg`;
      const newUser = await connectionDbb.registerUser(userToCreate)
      const text =
        "Nuevo usuario creado: nombre: " +
        newUser.name +
        " email: " +
        newUser.email +
        " address: " +
        newUser.address +
        " age: " +
        newUser.age +
        " phone " +
        newUser.phone +
        " photo " +
        newPhotoPath;
      enviarMail(Config.emailAdmin, "nuevo registro", text);
      downloadPicAndSaveInAvatars(
        userToCreate.photo,
        `${userToCreate.email}.jpg`
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.warn("No se pudo crear el usuario", error);
    return false;
  }
};

module.exports = { createUser };