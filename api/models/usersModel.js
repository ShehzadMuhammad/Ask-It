import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	name: {
		type: String,
		required: 'Enter your name'
	},
	email: {
		type: String,
		required: 'Enter your email'
	},
	password: {
		type: String,
		required: 'Enter a password'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Users', UsersSchema);
