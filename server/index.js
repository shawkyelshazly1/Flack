const express = require("express"),
	cors = require("cors"),
	morgan = require("morgan"),
	consola = require("consola"),
	{ initDatabaseConnection } = require("./database"),
	{ UserAPI, chatAPI, messageAPI } = require("./api"),
	{ configureSocketIOEvents } = require("./utils/socketIO");

// set dotenv
require("dotenv").config();

// create app instance express
const app = express();

// setting app dependencies
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// start db connection
initDatabaseConnection();

// initializing APIs
UserAPI(app);
chatAPI(app);
messageAPI(app);

// start server
const server = app.listen(process.env.PORT || 5000, () => {
	consola.success("🚀 Server started on Port: " + process.env.PORT);
});

// SocketIO server setup
configureSocketIOEvents(server);
