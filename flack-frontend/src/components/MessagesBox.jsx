import React, { useContext } from "react";
import { CurrentAppContext } from "../CurrentAppContext";
import ChatMessage from "./ChatMessage";
import S from "string";
import { CurrentUserContext } from "../CurrentUserContext";
import { useQuery } from "@tanstack/react-query";
import api from "../api";

export default function MessagesBox() {
	const { selectedChat, chatMessages, setChatMessages } =
		useContext(CurrentAppContext);
	const { currentUser } = useContext(CurrentUserContext);

	const { data, isLoading } = useQuery(
		["chat-messages", selectedChat],
		() => {
			return api.get(`chat/${selectedChat._id}/messages`).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => setChatMessages(data),
			refetchOnWindowFocus: false,
		}
	);

	let receiver = selectedChat.users.filter(
		(user) => user._id !== currentUser._id
	)[0];

	const chatName = S(receiver.firstName + " " + receiver.lastName).titleCase()
		.s;

	return (
		<div className="flex flex-col flex-1 gap-4 h-[82%] fixed w-full">
			<div className="flex flex-row items-center gap-2">
				<img className="w-8" src={receiver.profileImage} alt="" />
				<h1 className="font-semibold">{chatName}</h1>
			</div>
			<hr />
			<div className="flex flex-col-reverse gap-6 h-full overflow-y-scroll">
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					chatMessages.map((message) => (
						<ChatMessage message={message} key={message._id} />
					))
				)}
			</div>
		</div>
	);
}
