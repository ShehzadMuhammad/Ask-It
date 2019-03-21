import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import forum from './api/routes/forumRoutes';

const passport = require("passport");
const path = require('path');

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

//Server Static assets if in production
if(process.env.NODE_ENV === 'production'){
	//Set Static Folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}


// Routes
app.use("/api", forum);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});