import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, updateFormState } from "../utils/auth";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Login() {
	// formData state
	const [formData, setFormData] = useState({ email: "", password: "" });

	const navigate = useNavigate();
	const { setcurrentUser } = useContext(CurrentUserContext);

	return (
		<div className="w-full flex flex-col items-center justify-center gap-6 ">
			<div className="flex flex-col gap-4 items-center">
				<div className="flex flex-row gap-4 items-center">
					<img
						className="w-20"
						src="https://cdn-icons-png.flaticon.com/512/732/732245.png"
						alt=""
					/>
					<h1 className="text-5xl font-semibold ">Flack</h1>
				</div>

				<p className="text-2xl  font-medium">Sign in to Flack</p>
			</div>
			<form
				action=""
				onSubmit={(e) => {
					handleLogin(e, formData, setcurrentUser, navigate);
				}}
				className="flex flex-col gap-2 w-[15%]"
			>
				<input
					onChange={(e) => {
						updateFormState(e, formData, setFormData);
					}}
					type="email"
					name="email"
					placeholder="Email"
					required
					className="focus:outline-none p-2 border-2 rounded-lg focus:border-blue-400 w-full"
				/>
				<input
					onChange={(e) => {
						updateFormState(e, formData, setFormData);
					}}
					type="password"
					name="password"
					placeholder="Password"
					required
					className="focus:outline-none p-2 border-2 rounded-lg focus:border-blue-400 w-full"
				/>
				<button
					type="submit"
					className="w-full mt-4 bg-[#5C2C5D] py-2 text-white font-semibold rounded-lg"
				>
					Sign In
				</button>
			</form>
			<p>
				Don't have an account?{" "}
				<Link className="text-[#5C2C5D] font-semibold" to={"/register"}>
					Create One
				</Link>
			</p>
		</div>
	);
}
