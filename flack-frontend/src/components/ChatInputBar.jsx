import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";

import { MdSend } from "react-icons/md";
import api from "../api";
import { CurrentAppContext } from "../CurrentAppContext";
import { CurrentUserContext } from "../CurrentUserContext";

export default function ChatInputBar() {
	const [msgContent, setMsgContent] = useState("");
	const { currentUser } = useContext(CurrentUserContext);

	// load context
	const {
		socketIOClient,
		selectedChat,
		setChatMessages,
		chatMessages,
		updateChatLastMessage,
	} = useContext(CurrentAppContext);

	// send message mutation
	const createMessage = useMutation(({ messageData }) => {
		return api.post(`/message`, messageData).then((res) => {
			return res.data;
		});
	});

	// send msg to server
	const sendMessage = () => {
		if (msgContent.trim() !== "") {
			// send message with socket io

			createMessage.mutate(
				{
					messageData: { content: msgContent.trim(), chat: selectedChat._id },
				},
				{
					onSuccess: (data) => {
						setMsgContent("");
						setChatMessages([data, ...chatMessages]);
						socketIOClient.emit("new_msg", {
							message: data,
							chat: selectedChat,
						});
						updateChatLastMessage(selectedChat._id, data);
					},
				}
			);
		}
	};

	let receiver = selectedChat.users.filter(
		(user) => user._id !== currentUser._id
	)[0];

	return (
		<div className="bottom-2 absolute h-[7%]  w-[83%]">
			<div className="w-full h-full relative">
				<input
					type="text"
					onChange={(e) => {
						setMsgContent(e.target.value);
					}}
					value={msgContent}
					placeholder={`Message @${receiver.username}`}
					className="w-full border-2 h-full rounded-2xl focus:outline-none focus:border-[#3F0E40] px-3 "
					onKeyDown={(e) => {
						if (e.key === "Enter") sendMessage();
					}}
				/>
				<MdSend
					className="absolute bottom-[25%] right-5 cursor-pointer"
					color="#3F0E40"
					size={30}
					onClick={() => {
						sendMessage();
					}}
				/>
			</div>
		</div>
	);
}
