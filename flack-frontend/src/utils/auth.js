import api from "../api";
import toast from "react-hot-toast";
import axios from "axios";
//handle login form submission
export const handleLogin = (e, formData, setcurrentUser, navigate) => {
	e.preventDefault();

	toast.promise(api.post("/user/login", formData), {
		loading: "Loading...",
		success: (data) => {
			setcurrentUser(data.data.user);
			setAccessToken(data.data.token);
			axios.defaults.headers.authorization = `Bearer ${data.data.token}`;
			navigate("/");
			return "Logged In Successfully.";
		},
		error: (error) => `${error.response.data.error}`,
	});
};

//handle register form submission
export const handleRegister = (e, formData, navigate) => {
	e.preventDefault();

	toast.promise(api.post("/user/register", formData), {
		loading: "Loading...",
		success: (data) => {
			navigate("/");
			return "Registered Successfully. Now Login.";
		},
		error: (error) => `${error.response.data.error}`,
	});
};

// handle form state
export const updateFormState = (e, formData, setFormData) => {
	setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
};

const setAccessToken = (token) => {
	localStorage.setItem("accessToken", token);
};
