const { MessageService } = require("../services");
const { checkAuth } = require("./middlewares/auth");

// message APIs
module.exports = (app) => {
	// creat message service instance
	const messageService = new MessageService();

	// send message route
	app.post("/message", checkAuth, async (req, res, next) => {
		const { content, chat } = req.body;
		const sender = req.user._id;

		if ((!content, !chat)) {
			return res.status(409).json({ error: "Message data are required" });
		}

		// create new message in DB
		const data = await messageService.createMessage({ sender, content, chat });

		// return res with error if any
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success response
		return res.status(200).json(data.data);
	});
};
