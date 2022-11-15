const mongoose = require("mongoose"),
	consola = require("consola");

module.exports = () => {
	try {
		mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		consola.success("💾 MongoDB connected successfully!");
	} catch (error) {
		consola.error(error);
	}
};
