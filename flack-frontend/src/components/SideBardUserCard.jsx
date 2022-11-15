import React, { useState } from "react";

export default function SideBardUserCard() {
	const [unreadMessages, setUnreadMessages] = useState(0);
	return (
		<div className="flex flex-row gap-2 items-center cursor-pointer relative">
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
