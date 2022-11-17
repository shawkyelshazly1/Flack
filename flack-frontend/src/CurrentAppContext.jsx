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

	const updateChatLastMessage = (chatId, lastMessage) => {
		const chats = chatsList.map((chat) =>
			chat._id === chatId ? { ...chat, lastMessage } : chat
		);

		setChatsList(chats);
	};

	

	const clearStateOnlogout = () => {
		chatsList = [];
		socketIOClient = null;
		isSocketConnected = false;
		selectedChat = null;
		chatMessages = [];
	};

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
		updateChatLastMessage,
		clearStateOnlogout,
	
	};

	return (
		<CurrentAppContext.Provider value={stateValues}>
			{children}
		</CurrentAppContext.Provider>
	);
};
