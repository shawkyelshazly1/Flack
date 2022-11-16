import React, { useContext, useEffect } from "react";
import ChatInputBar from "./ChatInputBar";
import MessagesBox from "./MessagesBox";
import { HiChatAlt2 } from "react-icons/hi";

import { CurrentAppContext } from "../CurrentAppContext";
import { CurrentUserContext } from "../CurrentUserContext";

export default function ChatWindow() {
	// get context state values

	const {
		socketIOClient,
		selectedChat,
		isSocketConnected,
		setIsSocketConnected,
	} = useContext(CurrentAppContext);
	const { currentUser } = useContext(CurrentUserContext);

	// useEffect to listen to events
	useEffect(() => {
		// if socketio client is ready

		if (!socketIOClient) return;

		// if client is ready but not connected to server
		if (!isSocketConnected && socketIOClient) {
			// emit init_user event with userId
			socketIOClient.emit("init_user", currentUser?._id);

			// recieve connected event from server
			socketIOClient.on("user_connected", () => {
				console.log("🤘 Socket connected!");
				setIsSocketConnected(true);
			});
		}
	}, []);

	return (
		<div className="flex flex-1 flex-col p-4 h-full ">
			{!selectedChat ? (
				<div className="flex justify-center items-center h-full w-full flex-col gap-3">
					<HiChatAlt2 size={100} color="#644565" />
					<h1 className="text-3xl font-medium">
						Click on a chat to start a conversation
					</h1>
				</div>
			) : (
				<>
					<MessagesBox />
					<ChatInputBar />
				</>
			)}
		</div>
	);
}
