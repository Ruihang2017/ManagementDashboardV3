const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const commentSchema = new Schema({
  commentID: {
    type: String,
    required: true,
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
});

module.exports = commentSchema;
