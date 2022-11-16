const { MessageModel } = require("../models"),
	consola = require("consola"),
	mongoose = require("mongoose");

// message repository
class MessageRpository {
	// create new message in DB
	async CreateMessage(messageData) {
		try {
			const newMessage = await MessageModel(messageData);
			return await newMessage.save();
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// get chat messages
	async FindChatMessages(chatId) {
		try {
			const chatMessages = await MessageModel.find({
				chat: mongoose.Types.ObjectId(chatId),
			});
			return chatMessages;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = MessageRpository;
