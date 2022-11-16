const { ChatRepository } = require("../database"),
	consola = require("consola");

// class to interact with the message repository with DB
class ChatService {
	// constructor to set the repository instance
	constructor() {
		this.repository = new ChatRepository();
	}

	// create new chat if not exists
	async createChat(chatData) {
		try {
			// check if chat exists already
			const eixistingChat = await this.repository.FindExistingChatByUsers(
				chatData.users
			);

			if (eixistingChat) {
				return { data: eixistingChat };
			}

			// create new chat if doesn't exist already
			const newChat = await this.repository.CreateChat(chatData);
			return { data: newChat };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// load user Chats
	async loadChats(userId) {
		try {
			const chats = await this.repository.FindUserChats(userId);
			return { data: chats };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// load single chat by ID
	async loadSingleChat(chatId) {
		try {
			const chat = await this.repository.FindChatById(chatId);
			return { data: chat };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = ChatService;
