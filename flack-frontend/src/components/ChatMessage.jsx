import React, { useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { CurrentUserContext } from "../CurrentUserContext";
import S from "string";

export default function ChatMessage({ message }) {
	const [showReaction, setshowReaction] = useState("hidden");
	const { currentUser } = useContext(CurrentUserContext);

	let sender =
		message.sender._id === currentUser._id
			? "You"
			: S(message.sender.username).titleCase().s;

	return (
		<div className="flex flex-row gap-2 ">
			<img
				className="w-12 h-12 object-cover "
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
				alt=""
			/>
			<div className="flex flex-col gap-0">
				<h1 className="font-semibold text-sm">{sender}</h1>
				<div
					className="hover:bg-gray-100 py-2 px-1 relative"
					onMouseOver={() => {
						setshowReaction("");
					}}
					onMouseOut={() => {
						setshowReaction("hidden");
					}}
				>
					<p className="max-w-3/4">{message.content}</p>
					<div className="flex flex-row gap-2">
						<div className="flex flex-row items-center justify-center rounded-full border-[#1D9BD1] border-2  px-[6px] py-[2px] bg-[#E8F5FA]">
							😊 1
						</div>
						<div className="flex flex-row items-center justify-center  rounded-full border-[#1D9BD1] border-2  px-[6px] py-[2px]  bg-[#E8F5FA]">
							🚀 3
						</div>
					</div>
					{/* reactions tooltip */}
					<div
						className={`cursor-pointer absolute bottom-[90%] right-5 bg-white border-2 px-2 rounded-lg ${showReaction}`}
					>
						🙂<span className="">+</span>
						{/* <EmojiPicker width={300} height={400} /> */}
					</div>
				</div>
			</div>
		</div>
	);
}
