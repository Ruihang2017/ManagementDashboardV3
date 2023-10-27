const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Role = require('./Role');
// const Thought = require('./Thought');
// const Task = require('./Task');
// const ToDo = require('./ToDo');
// const commentSchema = require('./Comment');

// import schema from Book.js
// const bookSchema = require('./Book');

const employeeSchema = new Schema(
  {
    employeeID: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    roleID: {
      type: String,
    },
    avatarURI: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
    // thoughtIDs: [{
    //   type: String,
    //   ref: 'Thought',
    // }],
    // taskIDs: [{
    //   type: String,
    //   ref: 'Task',
    // }],
    // todoIDs: [ToDo.schema],
    // commentIDs: [Comment.schema],

    // set savedBooks to be an array of data that adheres to the bookSchema
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
employeeSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
employeeSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
employeeSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;
