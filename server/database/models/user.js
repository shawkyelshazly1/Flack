const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: { type: String, required: true, trim: true },
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true },
	password: { type: String, required: true, trim: true },
	profileImage: {
		type: String,
		default:
			"https://i.postimg.cc/C18bbHC3/T0266-FRGM-U011-PLSSMA9-g7e8a6705c42-512.png",
	},
});

module.exports = mongoose.model("User", userSchema);
