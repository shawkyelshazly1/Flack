import React, { useContext } from "react";
import { CurrentAppContext } from "../CurrentAppContext";
import ChatMessage from "./ChatMessage";

export default function MessagesBox() {
	return (
		<div className="flex flex-col flex-1 gap-4 h-[82%] fixed ">
			<div className="flex flex-row items-center gap-2">
				<img
					className="w-8"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
					alt=""
				/>
				<h1 className="font-semibold">Ahmed Mohamed</h1>
			</div>
			<hr />
			<div className="flex flex-col gap-6 h-full overflow-y-scroll">
				<ChatMessage />
				<ChatMessage />
				<ChatMessage />
				<ChatMessage />
				<ChatMessage />
				<ChatMessage />
				<ChatMessage />
			</div>
		</div>
	);
}
