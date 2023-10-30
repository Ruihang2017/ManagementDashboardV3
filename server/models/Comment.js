const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const Employee = require('./Employee');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const commentSchema = new Schema({
  commentID: {
    type: String,
    required: true,
    // unique: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
  postedTime: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  EmployeeID: {
    type: String,
    ref: 'Employee',
  },
});

module.exports = commentSchema;
// const Comment = model('Comment', commentSchema);

// module.exports = Comment;
