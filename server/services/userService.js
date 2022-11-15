const { UserRepository } = require("../database"),
	consola = require("consola"),
	bcryptjs = require("bcryptjs"),
	{ hashPassword, generateAccessToken } = require("../utils");

// class to interact with user services with DB
class UserService {
	// constructor to ser the user repository service
	constructor() {
		this.repository = new UserRepository();
	}

	// register new user
	async registerUser(userData) {
		const { username, email, password, confirmPassword } = userData;

		try {
			// validate passwords fields
			if (password !== confirmPassword) {
				return { error: "Password & Confirm Password doesn't match." };
			}

			// validate email or username not registered already
			let existingUser = await this.repository.FindUserByEmail(email);
			console.log(existingUser);
			if (existingUser) {
				return { error: "Email registered Already." };
			} else {
				// check by username
				existingUser = await this.repository.FindUserByUsername(username);
				if (existingUser) {
					return { error: "Username is taken." };
				}
			}

			// create new user
			const newUser = await this.repository.CreateUser({
				...userData,
				password: await hashPassword(password),
			});

			return { data: newUser };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// loginUser
	async loginUser(userData) {
		try {
			const { email, password } = userData;

			// check if existing user
			const existingUser = await this.repository.FindUserByEmail(email);

			// if email doesn't exist
			if (!existingUser) {
				return { error: "Email not found." };
			}

			// validate password

			if (!(await bcryptjs.compare(password, existingUser.password))) {
				return { error: "Invalid password." };
			}

			// load user and generate token in response
			const user = await this.repository.FindUserById(existingUser._id);

			const token = await generateAccessToken(user);
			return { data: { user, token } };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// get user by id
	async getUser(userId) {
		try {
			const existingUser = await this.repository.FindUserById(userId);

			// validate if user exists
			if (!existingUser) {
				return { error: "User not found." };
			}
			return { data: existingUser };
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = UserService;
