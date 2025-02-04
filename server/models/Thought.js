const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const commentSchema = require('./Comment');

/**
 * Thought Schema
 * This schema represents the structure of a thought document in the database.
 */
const thoughtSchema = new Schema(
	{
		thoughtID: {
			type: String,
			required: [true, 'Thought ID is required'],
			unique: true, // Ensure each thoughtID is unique
			trim: true, // Trim whitespace from the thought ID
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true, // Trim whitespace from the title
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true, // Trim whitespace from the description
		},
		comments: [commentSchema], // Array of Comment subdocuments
		datePosted: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		EmployeeID: {
			type: String,
			ref: 'Employee', // Reference to the Employee model
			trim: true, // Trim whitespace from the Employee ID
		},
	},
	{
		toJSON: {
			virtuals: true, // Enable virtual fields when converting to JSON
			getters: true, // Enable getters when converting to JSON
		},
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
