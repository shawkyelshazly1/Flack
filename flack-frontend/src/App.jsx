import "./App.css";
import { CurrentUserProvider } from "./CurrentUserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RoutesProvider from "./RoutesProvider";
import { CurrentAppProvider } from "./CurrentAppContext";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<CurrentUserProvider>
				<CurrentAppProvider>
					<RoutesProvider />
				</CurrentAppProvider>
			</CurrentUserProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
