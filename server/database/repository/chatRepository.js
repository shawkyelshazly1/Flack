const { ChatModel } = require("../models"),
	{ ObjectId } = require("mongoose").Types,
	consola = require("consola");

// chat repository class to interact with DB
class ChatRepository {
	// create Chat if not exists
	async CreateChat(chatData) {
		try {
			let newChat = await new ChatModel(chatData);
			newChat = await newChat.save();

			newChat = await newChat.populate({ path: "users", select: "-password" });
			if (newChat.lastMessage) {
				newChat = await newChat.populate({ path: "lastMessage" });
			}

			return newChat;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// load user chats by last message date
	async FindUserChats(userId) {
		try {
			const chats = await ChatModel.find({ $in: [ObjectId(userId)] })
				.populate({ path: "users", select: "-password" })
				.populate({
					path: "lastMessage",
				})
				.sort({ lastMessage: -1 });

			return chats;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// update chat last message
	async UpdateLastMessage(chatId, lastMessageId) {
		try {
			const chatUpdated = await ChatModel.findOneAndUpdate(
				{ _id: chatId },
				{ lastMessage: lastMessageId },
				{ new: true }
			);
			return chatUpdated;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// find chat by users
	async FindExistingChatByUsers(users) {
		try {
			const foundChat = await ChatModel.findOne({ users: { $all: users } })
				.populate({ path: "users", select: "-password" })
				.populate({ path: "lastMessage" });
			return foundChat;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// find chat by ID
	async FindChatById(chatId) {
		try {
			const foundChat = await ChatModel.findById(chatId)
				.populate({ path: "users", select: "-password" })
				.populate({ path: "lastMessage" });
			return foundChat;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = ChatRepository;
