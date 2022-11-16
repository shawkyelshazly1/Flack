import React, { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { CurrentAppContext } from "../CurrentAppContext";

export default function ChatInputBar() {
	const [msgContent, setMsgContent] = useState("");

	// load context
	const { socketIOClient } = useContext(CurrentAppContext);

	// send msg to server
	const sendMessage = () => {
		if (msgContent.trim() !== "") {
			socketIOClient.emit("new_msg", { content: msgContent, chatId: "asdasd" });
			setMsgContent("");
		}
	};

	return (
		<div className="bottom-2 absolute h-[7%]  w-[83%]">
			<div className="w-full h-full relative">
				<input
					type="text"
					onChange={(e) => {
						setMsgContent(e.target.value);
					}}
					placeholder="Message @Hamada"
					className="w-full border-2 h-full rounded-2xl focus:outline-none focus:border-[#3F0E40] px-3 "
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
