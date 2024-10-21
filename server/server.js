const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3002;
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

/**
 * Starts the Apollo server and sets up the necessary middleware and routes.
 * @returns {Promise<void>} A promise that resolves when the server is started.
 */
const startApolloServer = async () => {
	try {
		await server.start();

		// Middleware for parsing request bodies
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		// Apollo GraphQL middleware with authentication context
		app.use(
			'/graphql',
			expressMiddleware(server, {
				context: authMiddleware,
			})
		);

		// Serve static assets in production
		if (process.env.NODE_ENV === 'production') {
			app.use(express.static(path.join(__dirname, '../client/dist')));

			app.get('*', (req, res) => {
				res.sendFile(path.join(__dirname, '../client/dist/index.html'));
			});
		}

		// Start the server once the database connection is open
		db.once('open', () => {
			app.listen(PORT, () => {
				console.log(`API server running on port ${PORT}!`);
				console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
			});
		});
	} catch (error) {
		console.error('Error starting Apollo Server:', error);
	}
};

// Start the Apollo server
startApolloServer();
