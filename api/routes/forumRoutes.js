const express = require("express");
const router = express.Router();

import { getUsers, registerUser, loginUser } from '../controllers/usersController';

import { addPost, getAllPosts, deletePost, updatePost, getPostWithID, addComment, getCommentWithID, getCommentsWithPostID, getAllComments, deleteComment } from '../controllers/postsController';


//Routes for user

router.get("/users", getUsers);

router.post("/users/register", registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/users/login", loginUser);

//Routes for users posts
router.get("/posts", getAllPosts);

router.get("/posts/:postId", getPostWithID);

//Router for adding posts
router.post("/posts", addPost);

router.post("/comments", addComment);

router.get("/comments", getAllComments);

router.get("/comments/singlecomment/:commentId", getCommentWithID);

router.get("/comments/:postId", getCommentsWithPostID);

router.delete("/comments/:commentId", deleteComment)

router.put("/posts/:postId", updatePost);


router.delete("/posts/:postId", deletePost);

module.exports = router;