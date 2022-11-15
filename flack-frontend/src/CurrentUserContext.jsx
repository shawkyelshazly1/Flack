import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import api from "./api";

// user context
export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
	// Access the client
	const queryClient = useQueryClient();

	// initial states
	const [currentUser, setcurrentUser] = useState();
	const [authLoading, setAuthLoading] = useState(true);

	// use effect to validate the auth status
	useEffect(() => {
		checkAuthStatus();
	}, []);

	//check auth status
	const checkAuthStatus = () => {
		const token = localStorage.getItem("accessToken");
		setAuthLoading(true);

		// validate if token exists and call server api to load user
		if (token && token !== "") {
			api.get("/user/auth", {}).then((res) => {
				const user = res.data;
				setAuthLoading(false);
				if (user) {
					setcurrentUser(user);
				}
			});
		} else {
			setAuthLoading(false);
			setcurrentUser(null);
		}
	};

	// handle Logout
	const handleLogout = () => {
		// remove token and logout user
		localStorage.setItem("accessToken", "");
		setcurrentUser(null);
		queryClient.removeQueries();
	};

	const stateValues = {
		currentUser,
		setcurrentUser,
		authLoading,
		setAuthLoading,
		handleLogout,
		checkAuthStatus,
		queryClient,
	};
	return (
		<CurrentUserContext.Provider value={stateValues}>
			{children}
		</CurrentUserContext.Provider>
	);
};
