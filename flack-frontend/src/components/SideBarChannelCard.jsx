import React, { useState } from "react";
import { FaHashtag } from "react-icons/fa";

export default function SideBardUserCard() {
	const [unreadMessages, setUnreadMessages] = useState(0);
	return (
		<div className="flex flex-row gap-1 items-center cursor-pointer relative">
			<FaHashtag size="15" />
			<h1 className="font-medium ">Work</h1>
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
