import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import api from "../api";

import SideBardChatCard from "./SideBardChatCard";

export default function SideBar() {
	const { data: chats, isLoading } = useQuery(["user-chats"], () => {
		return api.get(`/chat/`).then((res) => {
			return res.data;
		});
	});

	return (
		<div className="w-[15%] bg-[#3F0E40] text-white py-4 h-full flex">
			<div className="flex flex-col gap-10 fixed h-full w-[16%] pr-2">
				<div className="flex flex-row items-center gap-2 ml-4">
					<BiMessageRoundedDetail size="30" />
					<h1 className="text-2xl font-semibold">DMs</h1>
				</div>

				{isLoading ? (
					<h1>Loading Chats...</h1>
				) : (
					<div className="flex flex-col gap-4 w-full overflow-y-auto px-4 h-[84%]">
						{chats
							.filter((chat) => chat.lastMessage)
							.map((chat) => (
								<SideBardChatCard chat={chat} key={chat._id} />
							))}
					</div>
				)}
			</div>
		</div>
	);
}
