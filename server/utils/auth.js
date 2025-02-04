const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Custom error definitions
const AuthenticationError = new GraphQLError('Could not authenticate user.', {
	extensions: {
		code: 'UNAUTHENTICATED',
	},
});

const InputError = new GraphQLError('Input error', {
	extensions: {
		code: 'INPUT_ERROR',
	},
});

/**
 * Middleware for authenticated routes
 * @param {Object} context - The request context
 * @returns {Object} - The modified request context with user data if authenticated
 */
const authMiddleware = ({ req }) => {
	// Allows token to be sent via req.body, req.query, or req.headers
	let token = req.body.token || req.query.token || req.headers.authorization;

	// Extract token from "Bearer <tokenvalue>"
	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	if (!token) {
		return req; // Return request if no token is found
	}

	try {
		// Verify token and attach user data to request
		const { data } = jwt.verify(token, secret, { maxAge: expiration });
		req.user = data;
	} catch (error) {
		console.error('Invalid token', error);
	}

	return req; // Return modified request
};

/**
 * Function to sign a new token
 * @param {Object} user - The user data
 * @param {string} user.username - The username
 * @param {string} user.email - The email
 * @param {string} user._id - The user ID
 * @returns {string} - The signed JWT token
 */
const signToken = ({ username, email, _id }) => {
	const payload = { username, email, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
	AuthenticationError,
	InputError,
	authMiddleware,
	signToken,
};
