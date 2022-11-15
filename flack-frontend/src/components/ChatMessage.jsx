import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function ChatMessage() {
	const [showReaction, setshowReaction] = useState("hidden");

	return (
		<div className="flex flex-row gap-2 ">
			<img
				className="w-12 h-12 object-cover "
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
				alt=""
			/>
			<div>
				<h1 className="font-semibold text-sm">Ahmed Mohamed</h1>
				<div
					className="hover:bg-gray-100 py-2 px-1 relative"
					onMouseOver={() => {
						setshowReaction("");
					}}
					onMouseOut={() => {
						setshowReaction("hidden");
					}}
				>
					<p className="w-3/4">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
						corporis velit ut illo, dignissimos repellendus veniam. Neque fuga
						ex error saepe, corrupti facilis nisi maxime laudantium eaque sit
						officiis numquam? Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Repudiandae, commodi sunt temporibus expedita quis atque
						assumenda laborum voluptas eum soluta odit natus? Totam facilis qui
						quae laborum eius neque magni!
					</p>
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
