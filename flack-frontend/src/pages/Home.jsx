import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
	return (
		<div className="w-full flex flex-col items-center">
			<Navbar />
			<div className="flex flex-row w-full h-full">
				<SideBar />
				<ChatWindow />
			</div>
		</div>
	);
}
