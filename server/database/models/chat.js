const mongoose = require("mongoose"),
	{ ObjectId } = mongoose.Schema.Types;
const chatSchema = mongoose.Schema(
	{
		users: [{ type: ObjectId, ref: "User" }],
		lastMessage: { type: ObjectId, ref: "Message" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
