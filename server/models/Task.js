const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const todoSchema = require('./ToDo');
const Employee = require('./Employee');

// const bcrypt = require('bcrypt');

// import schema from Book.js
// const bookSchema = require('./Book');

const taskSchema = new Schema(
  {
    taskID: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
      trim: true,

    },
    taskDescription: {
      type: String,
      required: true,
      trim: true,
    },
    todos: [todoSchema],
    startingTime: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    targetTime: {
      type: Date,
      required: true,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    completionTime: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Task = model('Task', taskSchema);

module.exports = Task;
