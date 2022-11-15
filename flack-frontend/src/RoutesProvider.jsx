import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./pages/PrivateRouter";
import Profile from "./pages/Profile";

export default function RoutesProvider() {
	return (
		<Router>
			<div className="w-full min-h-screen flex">
				<Toaster />
				<Routes>
					<Route
						path="*"
						element={
							<>
								<PrivateRouter>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/profile/:id" element={<Profile />} />
									</Routes>
								</PrivateRouter>
							</>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}
