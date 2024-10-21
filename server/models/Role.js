const { Schema, model } = require('mongoose');

/**
 * Role Schema
 * This schema represents the structure of a role document in the database.
 */
const roleSchema = new Schema(
	{
		roleID: {
			type: String,
			required: [true, 'Role ID is required'],
			unique: true, // Ensure each roleID is unique
			trim: true, // Trim whitespace from the role ID
		},
		roleName: {
			type: String,
			required: [true, 'Role name is required'],
			trim: true, // Trim whitespace from the role name
		},
	},
	{
		toJSON: {
			virtuals: true, // Enable virtual fields when converting to JSON
		},
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

const Role = model('Role', roleSchema);

module.exports = Role;
