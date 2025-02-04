const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Book'); // Import schema from Book.js

/**
 * User Schema
 * This schema represents the structure of a user document in the database.
 */
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true, // Ensure each username is unique
			trim: true, // Trim whitespace from the username
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true, // Ensure each email is unique
			lowercase: true, // Convert email to lowercase
			trim: true, // Trim whitespace from the email
			match: [/.+@.+\..+/, 'Must use a valid email address'], // Validate email format
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 8, // Minimum length for password
		},
		// Set savedBooks to be an array of data that adheres to the bookSchema
		savedBooks: [bookSchema],
	},
	{
		toJSON: {
			virtuals: true, // Enable virtual fields when converting to JSON
		},
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// When we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
	return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;
