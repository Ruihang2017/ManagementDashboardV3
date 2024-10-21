const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

/**
 * ToDo Schema
 * This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js.
 */
const todoSchema = new Schema(
	{
		todoID: {
			type: String,
			required: [true, 'ToDo ID is required'],
			unique: true, // Ensure each todoID is unique
			trim: true, // Trim whitespace from the todo ID
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true, // Trim whitespace from the name
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true, // Trim whitespace from the description
		},
		completed: {
			type: Boolean,
			default: false, // Default value for completed status
		},
		completionTime: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		EmployeeIDs: [
			{
				type: String,
				ref: 'Employee', // Reference to the Employee model
				trim: true, // Trim whitespace from the Employee ID
			},
		],
	},
	{
		toJSON: {
			virtuals: true, // Enable virtual fields when converting to JSON
			getters: true, // Enable getters when converting to JSON
		},
	}
);

module.exports = todoSchema;
