const { Schema } = require('mongoose');
const Employee = require('./Employee');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const todoSchema = new Schema(
    {
        todoID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        completionTime: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = todoSchema;
