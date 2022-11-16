import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// create app context
export const CurrentAppContext = createContext(null);

// app provider
export const CurrentAppProvider = ({ children }) => {
	// default states and setters
	const [chatsList, setChatsList] = useState([]);
	const [socketIOClient, setSocketIOClient] = useState(null);
	const [isSocketConnected, setIsSocketConnected] = useState(false);
	const [selectedChat, setSelectedChat] = useState(null);
	const [chatMessages, setChatMessages] = useState([]);

	// useEffect to connect SocketIO client
	useEffect(() => {
		const socket = io("http://localhost:5000");
		setSocketIOClient(socket);
	}, []);

	// state values
	const stateValues = {
		chatsList,
		setChatsList,
		chatMessages,
		setChatMessages,
		socketIOClient,
		setSocketIOClient,
		isSocketConnected,
		setIsSocketConnected,
		selectedChat,
		setSelectedChat,
	};

	return (
		<CurrentAppContext.Provider value={stateValues}>
			{children}
		</CurrentAppContext.Provider>
	);
};
