const messagesModel = require("../../models/Messages.model");

module.exports = class MessageMongoDAO {
  constructor() {}

  async getMessages() {
    return await messagesModel.find();
  }

  async getMessagesById(id) {
    return await messagesModel.findById(id);
  }

  async addMessage(message) {
    return await messagesModel.create(message);
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new MessageMongoDAO();
    }
    return this.instance;
  }
};
