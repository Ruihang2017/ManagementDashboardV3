const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Role = require('./Role');

/**
 * Employee Schema
 * This schema represents the structure of an employee document in the database.
 */
const employeeSchema = new Schema(
	{
		employeeID: {
			type: String,
			required: [true, 'Employee ID is required'],
			unique: true, // Ensure each employeeID is unique
			trim: true, // Trim whitespace from the employee ID
		},
		firstname: {
			type: String,
			required: [true, 'First name is required'],
			trim: true, // Trim whitespace from the first name
		},
		lastname: {
			type: String,
			required: [true, 'Last name is required'],
			trim: true, // Trim whitespace from the last name
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true, // Ensure each email is unique
			match: [/.+@.+\..+/, 'Must use a valid email address'],
			trim: true, // Trim whitespace from the email
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		roleID: {
			type: String,
			ref: 'Role', // Reference to the Role model
			trim: true, // Trim whitespace from the role ID
		},
		avatarURI: {
			type: String,
			default: 'https://i.pravatar.cc/300', // Default avatar URI
			trim: true, // Trim whitespace from the avatar URI
		},
	},
	{
		toJSON: {
			virtuals: true, // Enable virtual fields when converting to JSON
		},
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

// Hash user password before saving
employeeSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

// Custom method to compare and validate password for logging in
employeeSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// Virtual field to get the full name of the employee
employeeSchema.virtual('name').get(function () {
	return `${this.firstname} ${this.lastname}`;
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;
