const MessageService = require("../service/MessageService");

const getMessages = async (ctx, next) => {
  ctx.body = await MessageService.getMessages();
};

const getMessagesById = async (ctx, next) => {
  ctx.body = await MessageService.getMessagesById(ctx.params.id);
};

const addMessage = async (ctx, next) => {
  ctx.body = await MessageService.addMessage(ctx.request.body);
};

module.exports = {
  getMessages,
  addMessage,
  getMessagesById,
};
