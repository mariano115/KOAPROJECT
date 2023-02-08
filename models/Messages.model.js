const { Schema, model } = require("mongoose");

const MessagesSchema = new Schema({
	email: { type: String, required: true },
	type: { type: String, required: true },
	date: { type: Date, required: true },
	text: { type: String, required: true }
});
module.exports = model("mensajes", MessagesSchema)