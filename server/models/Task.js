const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const todoSchema = require('./ToDo');

/**
 * Task Schema
 * This schema represents the structure of a task document in the database.
 */
const taskSchema = new Schema(
	{
		taskID: {
			type: String,
			required: [true, 'Task ID is required'],
			unique: true, // Ensure each taskID is unique
			trim: true, // Trim whitespace from the task ID
		},
		taskName: {
			type: String,
			required: [true, 'Task name is required'],
			trim: true, // Trim whitespace from the task name
		},
		taskDescription: {
			type: String,
			required: [true, 'Task description is required'],
			trim: true, // Trim whitespace from the task description
		},
		todos: [todoSchema], // Array of ToDo subdocuments
		startingTime: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		targetTime: {
			type: Date,
			required: [true, 'Target time is required'],
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		completionTime: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp), // Format the timestamp using dateFormat utility
		},
		completed: {
			type: Boolean,
			default: false, // Default value for completed status
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
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

const Task = model('Task', taskSchema);

module.exports = Task;
