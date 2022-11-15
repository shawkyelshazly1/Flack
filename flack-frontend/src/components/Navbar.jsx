import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Navbar() {
	const { handleLogout } = useContext(CurrentUserContext);
	const navigate = useNavigate();

	return (
		<div className="flex flex-row w-full items-center justify-center py-2 px-4 bg-[#350D36]">
			<div className="flex flex-1 flex-row items-center justify-center">
				<input
					type="text"
					className="w-[40%] focus:outline-none focus:bg-white rounded-lg px-3 py-2 bg-[#644565]"
					placeholder="🔎 Search for Users"
				/>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<div className="tooltip">
					<CgProfile
						size="40"
						color="white"
						className="cursor-pointer"
						onClick={() => {
							navigate(`/profile/asdasd54asd`);
						}}
					/>
					<span class="tooltiptext">Profile Name</span>
				</div>

				<FiLogOut
					size="30"
					color="white"
					onClick={handleLogout}
					className="cursor-pointer"
				/>
			</div>
		</div>
	);
}
