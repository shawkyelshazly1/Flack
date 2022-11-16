import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

import SideBardUserCard from "./SideBardUserCard";

export default function SideBar() {
	return (
		<div className="w-[15%] bg-[#3F0E40] text-white px-2 py-4 h-full flex">
			<div className="flex flex-col gap-10 fixed h-full w-[14%]">
				<div className="flex flex-row items-center gap-2">
					<BiMessageRoundedDetail size="30" />
					<h1 className="text-2xl font-semibold">DMs</h1>
				</div>
				<div className="flex flex-col gap-4 w-full overflow-y-auto px-4 h-[84%]">
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
					<SideBardUserCard />
				</div>
			</div>
		</div>
	);
}
