const bcryptjs = require("bcryptjs"),
	jwt = require("jsonwebtoken");

// hash password function
exports.hashPassword = async (password) => {
	return bcryptjs.hashSync(password, 10);
};

// generate access token
exports.generateAccessToken = async (payload) => {
	return jwt.sign({ payload }, process.env.APP_SECRET, {
		expiresIn: "1w",
	});
};

// validate access token
exports.validateAccessToken = async (req) => {
	const token = req.get("authorization");
	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.APP_SECRET
		);

		req.user = payload.payload;
		return true;
	}
	return false;
};
