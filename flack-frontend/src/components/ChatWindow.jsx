import React from "react";
import ChatInputBar from "./ChatInputBar";
import MessagesBox from "./MessagesBox";

export default function ChatWindow() {
	return (
		<div className="flex flex-1 flex-col p-4 h-full w-full">
			<MessagesBox />
			<ChatInputBar />
		</div>
	);
}
