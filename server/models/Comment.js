const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

/**
 * Comment Schema
 * This is a subdocument schema used for the User's `savedBooks` array in User.js.
 * It represents the structure of a comment.
 */
const commentSchema = new Schema(
	{
		commentID: {
			type: String,
			// Uncomment the following lines if you want to enforce these constraints
			// required: [true, 'Comment ID is required'],
			// unique: true, // Ensure each commentID is unique
			trim: true, // Trim whitespace from the comment ID
		},
		commentContent: {
			type: String,
			required: [true, 'Comment content is required'],
			trim: true, // Trim whitespace from the comment content
		},
		postedTime: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		EmployeeID: {
			type: String,
			ref: 'Employee',
			trim: true, // Trim whitespace from the Employee ID
		},
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt fields
		toJSON: { getters: true }, // Enable getters when converting to JSON
	}
);

module.exports = commentSchema;
