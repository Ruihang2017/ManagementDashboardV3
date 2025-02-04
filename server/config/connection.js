/**
 * connection.js
 *
 * This module establishes a connection to the MongoDB database using Mongoose.
 * It loads environment variables from a .env file and exports the Mongoose connection.
 */

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
		useUnifiedTopology: true, // Use the new unified topology layer for better connection management
	})
	.then(() => {
		console.log('Successfully connected to MongoDB.\n');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
		process.exit(1); // Exit the process with failure
	});

// Export the Mongoose connection
module.exports = mongoose.connection;
