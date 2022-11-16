import React, { useContext, useState } from "react";
import { CurrentAppContext } from "../CurrentAppContext";

export default function SideBardUserCard() {
	const [unreadMessages, setUnreadMessages] = useState(0);
	const { selectedChat, setSelectedChat, socketIOClient } =
		useContext(CurrentAppContext);
	const id = "asdasd";
	return (
		<div
			className={`flex flex-row gap-2 items-center cursor-pointer relative  p-2 rounded-lg ${
				selectedChat?._id === id ? "bg-[#644565]" : ""
			}`}
			onClick={() => {
				setSelectedChat({ _id: "asdasd" });
				socketIOClient.emit("join_chat", id);
			}}
		>
			<img
				className="w-8 rounded-lg"
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
				alt=""
			/>
			<h1 className="font-medium ">Ahmed mohamed</h1>
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
