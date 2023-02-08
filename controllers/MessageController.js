const MessageService = require("../service/MessageService");

const getMessages = async (req, res) => {
  res.send(await MessageService.getMessages());
};

const getMessagesById = async (req, res) => {
  res.send(await MessageService.getMessagesById(req.params.id));
};

const addMessage = async (req, res) => {
  res.send(await MessageService.addMessage(req.body));
};

module.exports = {
  getMessages,
  addMessage,
  getMessagesById,
};
