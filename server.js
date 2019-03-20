import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import forum from './api/routes/forumRoutes';

const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 5000;

// DB Config
const uri = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose.connect(uri, {
   useNewUrlParser: true 
	}).then(() => {
	console.log('MongoDB Connected...');
	useNewUrlParser: true 
	}).catch(err => console.log(err));



//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api", forum);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});