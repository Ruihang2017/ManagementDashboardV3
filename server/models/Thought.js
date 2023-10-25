const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const commentSchema = require('./Comment');

const thoughtSchema = new Schema(
  {
    thoughtID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,

    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [commentSchema],
    datePosted: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    EmployeeID: {
      type: String,
      ref: 'Employee',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
