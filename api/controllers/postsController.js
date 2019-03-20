import mongoose from 'mongoose';

const Post = require('../models/postsModel');
const Comment = require('../models/commentsModel');


export const addPost = (req, res) => {
	let newPost = new Post(req.body);

	newPost.save((err, post) => {
		if(err){
			res.send(err);
		}
		res.json(post);
	});
};

export const addComment = (req, res) => {
	let newComment = new Comment(req.body);

	newComment.save((err, comment) => {
		if(err){
			res.send(err);
		}
		res.json(comment);
	});
};

export const getCommentWithID = (req, res) => {
	Comment.findById(req.params.commentId, (err, comment) => {
		if(err){
			res.send(err)
		}
		res.json(comment);
	});
};

export const getCommentsWithPostID = (req, res) => {
	Comment.find({postID: req.params.postId}, (err, comment) => {
		if(err){
			res.send(err);
		}
		res.json(comment);
	});
};

export const getAllComments = (req, res) => {
	Comment.find().sort('-created_date').find({}, (err, comment) => {
		if(err){
			res.send(err);
		}
		res.json(comment);
	});
};

export const deleteComment = (req, res) => {
	Comment.deleteOne({_id: req.params.commentId}, (err, post) => {
		if(err){
			res.send(err);
		}
		res.json({ message: 'Successfully deleted post'});
	});
};


export const getAllPosts = (req, res) => {
	Post.find().sort('-created_date').find({}, (err, post) => {
		if(err){
			res.send(err);
		}
		res.json(post);
	});
};

export const getPostWithID = (req, res) => {
	Post.findById(req.params.postId, (err, post) => {
		if(err){
			res.send(err)
		}
		res.json(post);
	});
};

export const updatePost = (req, res) => {
	Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true }, (err,  post) => {
		if(err){
			res.send(err);
		}
		res.json(post);
	});
};

export const deletePost = (req, res) => {
	Post.deleteOne({_id: req.params.postId}, (err, post) => {
		if(err){
			res.send(err);
		}
		res.json({ message: 'Successfully deleted post'});
	});
};
