const { Schema, model } = require('mongoose');

// const bcrypt = require('bcrypt');

// import schema from Book.js
// const bookSchema = require('./Book');

const roleSchema = new Schema(
  {
    roleID: {
      type: String,
      // required: true,
      // unique: true,
    },
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Role = model('Role', roleSchema);

module.exports = Role;
