const { UserModel } = require("../models"),
	consola = require("consola"),
	mongoose = require("mongoose");

// class to handle the interaction with user model on DB
class UserRepository {
	// add user to DB
	async CreateUser(userData) {
		try {
			const newUser = await new UserModel(userData);
			return await newUser.save();
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// find user by ID
	async FindUserById(userId) {
		try {
			const existingUser = await UserModel.findById(
				mongoose.Types.ObjectId(userId),
				{ password: 0 }
			);
			return existingUser;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// find user by username
	async FindUserByUsername(username) {
		try {
			const existingUser = await UserModel.findOne(
				{ username },
				{ password: 0 }
			);
			return existingUser;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}

	// find user by email
	async FindUserByEmail(email) {
		try {
			const existingUser = await UserModel.findOne({ email });
			return existingUser;
		} catch (error) {
			consola.error(error);
			return { error: "Something went wrong!" };
		}
	}
}

module.exports = UserRepository;
