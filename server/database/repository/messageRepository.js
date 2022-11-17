const { MessageModel } = require("../models"),
	consola = require("consola"),
	mongoose = require("mongoose");

// message repository
class MessageRpository {
	// create new message in DB
	async CreateMessage(messageData) {
		try {
			let newMessage = await MessageModel(messageData);
			newMessage = await newMessage.save();
			newMessage = await newMessage.populate("sender", "-password");
			return newMessage;
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
			})
				.populate("sender", "-password")
				.sort({ createdAt: -1 });
			return chatMessages;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = MessageRpository;
