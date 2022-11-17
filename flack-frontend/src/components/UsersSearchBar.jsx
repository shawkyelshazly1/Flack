import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../api";
import UserSearchResultCard from "./UserSearchResultCard";

export default function UsersSearchBar() {
	const [showSearchResult, setshowSearchResult] = useState(false);
	const [searchQuery, setsearchQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const { data, isLoading } = useQuery(
		["users-search", searchQuery],

		() => {
			if (searchQuery.trim() !== "")
				return api.get(`/user/search/${searchQuery}`, {}).then((res) => {
					return res.data;
				});
			else return [];
		},
		{
			onSuccess: (data) => {
				setSearchResult(data);
			},
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div className="flex flex-1 flex-col items-center justify-center relative">
			<input
				type="text"
				className="w-[40%] focus:outline-none focus:bg-white focus:rounded-b-none rounded-lg  px-3 py-2 bg-[#644565]"
				placeholder="🔎 Search for Users"
				onFocus={() => {
					setshowSearchResult(!showSearchResult);
				}}
				onBlur={(e) => {
					if (!e.currentTarget.contains(e.relatedTarget)) {
						if (e.relatedTarget === null) setshowSearchResult(false);
					}
				}}
				onChange={(e) => {
					setsearchQuery(e.target.value);
				}}
			/>
			{showSearchResult ? (
				<div className="users_search_bar flex flex-col gap-2 bg-white py-3 absolute top-[2.5em] w-[40%] px-3 rounded-b-lg z-[9999]">
					<hr className="mb-2" />
					{searchResult.length < 1 && searchQuery === "" ? (
						<h1>Start typing to search for users</h1>
					) : (
						<>
							{searchQuery !== "" && searchResult.length < 1 ? (
								<h1>Oops no results found.</h1>
							) : (
								searchResult.map((user) => (
									<UserSearchResultCard
										key={user._id}
										user={user}
										setshowSearchResult={setshowSearchResult}
									/>
								))
							)}
						</>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
