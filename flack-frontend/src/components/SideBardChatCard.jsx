import React, { useContext, useState } from "react";
import { CurrentAppContext } from "../CurrentAppContext";
import { CurrentUserContext } from "../CurrentUserContext";
import S from "string";

export default function SideBardChatCard({ chat }) {
	const [unreadMessages, setUnreadMessages] = useState(0);
	const { selectedChat, setSelectedChat, socketIOClient } =
		useContext(CurrentAppContext);
	const { currentUser } = useContext(CurrentUserContext);

	let receiver = chat.users.filter((user) => user._id !== currentUser._id)[0];
	let lastMessageSender =
		chat.lastMessage.sender === currentUser._id ? "You" : receiver.username;

	return (
		<div
			className={`flex flex-row gap-2 items-center cursor-pointer relative  p-2 rounded-lg ${
				selectedChat?._id === chat._id ? "bg-[#644565]" : ""
			}`}
			onClick={() => {
				setSelectedChat(chat);
				socketIOClient.emit("join_chat", chat._id);
			}}
		>
			<img className="w-12 rounded-lg" src={receiver.profileImage} alt="" />
			<div className="flex flex-col gap-1 w-full">
				<h1 className="font-medium ">
					{S(receiver.firstName + " " + receiver.lastName).titleCase().s}
				</h1>
				<p className="text-sm">
					<b>{lastMessageSender}</b>
					{": " + S(chat.lastMessage.content).truncate(40).s}
				</p>
			</div>
			{unreadMessages > 0 ? (
				<span className="absolute right-0 bg-white rounded-full px-3 text-[#3F0E40]">
					{unreadMessages}
				</span>
			) : (
				""
			)}
		</div>
	);
}
