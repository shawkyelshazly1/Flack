import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import S from "string";
import api from "../api";
import { CurrentAppContext } from "../CurrentAppContext";
import { CurrentUserContext } from "../CurrentUserContext";

export default function UserSearchResultCard({ user, setshowSearchResult }) {
	const { currentUser } = useContext(CurrentUserContext);
	const { setSelectedChat } = useContext(CurrentAppContext);

	// usemutate to create new chat for user
	const createChat = useMutation(({ chatData }) => {
		return api.post(`/chat`, chatData).then((res) => {
			return res.data;
		});
	});

	return (
		<div
			className="searchResult flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2 rounded-lg "
			tabIndex="-1"
			onClick={(e) => {
				toast.promise(
					createChat.mutateAsync(
						{
							chatData: { users: [currentUser._id, user._id] },
						},
						{
							onSuccess: (data) => {
								setSelectedChat(data);
								setshowSearchResult(false);
							},

							onError: <b>Something went wrong!</b>,
						}
					)
				);
			}}
		>
			<img className="w-12" src={user.profileImage} alt="" />
			<div className="flex flex-col">
				<h1 className="font-medium">
					{S(user.firstName + " " + user.lastName).titleCase().s}
				</h1>
				<p className="text-gray-500">@{user.username}</p>
			</div>
		</div>
	);
}
