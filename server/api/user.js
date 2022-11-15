const { UserService } = require("../services");
const { checkAuth } = require("./middlewares/auth");

// User APIs
module.exports = (app) => {
	// create user service object
	const userService = new UserService();

	// signin Route
	app.post("/user/login", async (req, res, next) => {
		const { email, password } = req.body;
		// validate if email and password are added
		console.log(req.body);
		if (!email || !password) {
			return res.status(409).json({ error: "Email & Password are required." });
		}

		// login user
		const data = await userService.loginUser({ email, password });

		// validate and return if error
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success
		return res.status(200).json(data.data);
	});

	// signup Route
	app.post("/user/register", async (req, res, next) => {
		const { email, username, password, confirmPassword, firstName, lastName } =
			req.body;
		console.log(req.body);
		// validate user data in req body
		if (
			!email ||
			!username ||
			!password ||
			!confirmPassword ||
			!firstName ||
			!lastName
		) {
			return res.status(409).json({ error: "User Data are required." });
		}

		const data = await userService.registerUser({
			email,
			username,
			password,
			confirmPassword,
			firstName,
			lastName,
		});

		// validate and return if error
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		// return success
		return res.status(200).json({ data: "Registered Success" });
	});

	// auth Route
	app.get("/user/auth", checkAuth, async (req, res, next) => {
		const { _id } = req.user;

		const data = await userService.getUser(_id);

		// validate and return if error
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}

		return res.status(200).json(data.data);
	});
};
