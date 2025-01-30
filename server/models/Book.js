const { Schema } = require('mongoose');

/**
 * Book Schema
 * This is a subdocument schema used for the User's `savedBooks` array in User.js.
 * It represents the structure of a saved book.
 */
const bookSchema = new Schema(
	{
		authors: [
			{
				type: String,
				trim: true,
			},
		],
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true,
		},
		// saved book id from GoogleBooks
		bookId: {
			type: String,
			required: [true, 'Book ID is required'],
			unique: true,
			trim: true,
		},
		image: {
			type: String,
			trim: true,
		},
		link: {
			type: String,
			trim: true,
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = bookSchema;
