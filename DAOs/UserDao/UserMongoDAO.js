const userModel = require("../../models/User.model");

module.exports = class UsersMongoDb {
  constructor() {}

  async findUserByEmail(email) {
    return await userModel.findOne({ email: email });
  }

  async registerUser(userToCreate) {
    console.log("registerUser");
    const newUser = new userModel(userToCreate);
    newUser.save();
    return newUser;
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new UsersMongoDb();
    }
    return this.instance;
  }
};
