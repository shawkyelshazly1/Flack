const { ChatService, MessageService } = require("../services");
const { checkAuth } = require("./middlewares/auth");

// chat APIs
module.exports = (app) => {
	// create chat service instance
	const chatService = new ChatService();
	const messageService = new MessageService();

	// create new chat route
	app.post("/chat", checkAuth, async (req, res, next) => {
		const { users } = req.body;

		// create new chat in DB
		const data = await chatService.createChat({ users });

		// return res with error if any
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success response
		return res.status(200).json(data.data);
	});

	// load chat
	app.get("/chat/:chatId", checkAuth, async (req, res, next) => {
		const { chatId } = req.params;

		// search chat in DB
		const data = await chatService.loadSingleChat(chatId);

		// return res with error if any
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success response
		return res.status(200).json(data.data);
	});

	// load user chats route
	app.get("/chat", checkAuth, async (req, res, next) => {
		const { _id } = req.user;

		// load chats from DB
		const data = await chatService.loadChats(_id);

		// return res with error if any
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success response
		return res.status(200).json(data.data);
	});

	// load chat messges
	app.get("/chat/:chatId/messages", checkAuth, async (req, res, next) => {
		const { chatId } = req.params;

		//load chat message from DB
		const data = await messageService.loadChatMessages(chatId);

		// return res with error if any
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success response
		return res.status(200).json(data.data);
	});
};
