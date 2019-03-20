import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
	author: {
		type: String,
		required: 'Enter your name'
	},
	authorID: {
		type: String,
		required: 'Enter your name'
	},
	post: {
		type: String,
		required: 'Enter your post'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Posts', PostsSchema);
