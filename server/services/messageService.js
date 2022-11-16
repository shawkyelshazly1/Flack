const { MessageRepository, ChatRepository } = require("../database"),
	consola = require("consola"),
	_ = require("lodash");

// class to interact with the message repository with DB
class MessageService {
	// constructor to set the repository instance
	constructor() {
		this.repository = new MessageRepository();
		this.chatRepository = new ChatRepository();
	}

	// create New Message
	async createMessage(messageData) {
		try {
			//check if user is part of the chat
			const foundChat = await this.chatRepository.FindChatById(
				messageData.chat
			);

			if (
				!_.some(
					foundChat.users,
					(user) => String(user._id) === String(messageData.sender)
				) ||
				!foundChat
			) {
				return { error: "Not Authorized!" };
			}

			// saving message in DB
			const newMessage = await this.repository.CreateMessage(messageData);

			// updating chat last message ID
			const chat = await this.chatRepository.UpdateLastMessage(
				messageData.chat,
				newMessage._id
			);

			return { data: newMessage };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// load chat messages
	async loadChatMessages(chatId) {
		try {
			const chatMessages = await this.repository.FindChatMessages(chatId);
			return { data: chatMessages };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = MessageService;
