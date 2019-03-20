import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
	author: {
		type: String,
		required: 'Enter your name'
	},
	authorID: {
		type: String,
		required: 'Enter your name'
	},
	content: {
		type: String,
		required: 'Enter your post'
	},
	postID: {
		 type: Schema.ObjectId, 
		 ref: 'Posts'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comments', CommentsSchema);
