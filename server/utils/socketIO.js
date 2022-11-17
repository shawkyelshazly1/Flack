const { Server } = require("socket.io"),
	consola = require("consola");

// configure message events
const configureMessageEvents = (socket) => {
	// send message events
	socket.on("new_msg", async (newMsg) => {
		const { message, chat } = newMsg;

		// validate data exists
		if (!chat || !message) return;

		await Promise.all(
			chat.users.map(async (user) => {
				// send message to all users except sender
				if (String(user._id) !== String(message.sender._id)) {
					socket.to(user._id).emit("new_msg_recieved", newMsg);
				}
			})
		);
	});
};

//handle disconnection from server
const configureDisconnectEevents = (socket) => {
	// on user disconnection
	socket.on("disconnect", () => {
		consola.info("📴 user disconnected");
	});

	// remove init_user listener
	socket.off("init_user", (userId) => {
		consola.info("user socket disconnected");
		socket.leave(userId);
	});
};

// configure socketIo server
const configureSocketIOEvents = (server) => {
	// io server instance
	const io = new Server(server, {
		cors: { origin: "http://localhost:3000" },
	});

	// on user connection
	io.on("connection", (socket) => {
		// initialize user
		socket.on("init_user", (userId) => {
			socket.join(userId);
			socket.emit("user_connected");
			consola.info("user initialized ", userId);
		});

		// initialize chat
		socket.on("join_chat", (chatId) => {
			socket.join(chatId);
			consola.info("User joined chat: ", chatId);
		});

		// configure events
		configureDisconnectEevents(socket);
		configureMessageEvents(socket);
	});
};

module.exports = { configureSocketIOEvents };
