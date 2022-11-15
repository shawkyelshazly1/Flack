import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaSlackHash } from "react-icons/fa";
import SideBardUserCard from "./SideBardUserCard";
import SideBarChannelCard from "./SideBarChannelCard";

export default function SideBar() {
	return (
		<div className="w-[15%] bg-[#3F0E40] text-white px-2 py-4">
			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-center gap-2">
						<BiMessageRoundedDetail size="30" />
						<h1 className="text-2xl font-semibold">DMs</h1>
					</div>
					<div className="flex flex-col gap-4 ml-6">
						<SideBardUserCard />
						<SideBardUserCard />
						<SideBardUserCard />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-center gap-2">
						<FaSlackHash size="30" />
						<h1 className="text-2xl font-semibold">Channels</h1>
					</div>
					<div className="flex flex-col gap-4 ml-6">
						<SideBarChannelCard />
						<SideBarChannelCard />
						<SideBarChannelCard />
					</div>
				</div>
			</div>
		</div>
	);
}
