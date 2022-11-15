const { validateAccessToken } = require("../../utils");

// user auth middleware
exports.checkAuth = async (req, res, next) => {
	try {
		// validate if access token is valid
		const isAuthenticated = await validateAccessToken(req);
		if (isAuthenticated) {
			
			return next();
		}
		// return error if not valid
		return res.status(403).json({ error: "Not Authorized!" });
	} catch (error) {
		return res.status(403).json({ error: "Not Authorized!" });
	}
};
