import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { CurrentUserContext } from "../CurrentUserContext";
import UsersSearchBar from "./UsersSearchBar";

export default function Navbar() {
	const { handleLogout } = useContext(CurrentUserContext);
	const navigate = useNavigate();

	return (
		<div className="flex flex-row w-full items-center justify-center py-2 px-4 bg-[#350D36]">
			<UsersSearchBar />
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
					<span className="tooltiptext">Profile Name</span>
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
