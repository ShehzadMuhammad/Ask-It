import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';

import axios from 'axios';

import './styles.css';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});


class QuestionPageComponent extends Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      myPost: '',
	      myComments: '',
	      comment: '',
	      myauthor: '',
	      myauthorID: '',
	      mypostID: ''
	    }
	  }

	componentDidMount(){
		axios.get('/api/posts/' + this.props.match.params.question)
		.then(response => {
			this.setState({
				myPost: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		})

		axios.get('/api/comments/' + this.props.match.params.question)
		.then(response => {
			this.setState({
				myComments: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	onDeleteClick(commentID){
			axios.delete('/api/comments/' + commentID)
			.then(response => {
				console.log("Comment Deleted");
		})
		.catch(function (error) {
			console.log(error);
		})

		axios.get('/api/comments/' + this.props.match.params.question)
		.then(response => {
			this.setState({
				myComments: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };


	onAddClick = (user, e) => {
	e.preventDefault();
		const newComment = {
        	author: user.name,
        	authorID: user.id,
        	postID: this.props.match.params.question,
        	content: this.state.comment
      	};

    	axios.post('/api/comments/', newComment)
			.then(response => {
				console.log("Comment Added");
		})
		.catch(function (error) {
			console.log(error);
		})

		axios.get('/api/comments/' + this.props.match.params.question)
		.then(response => {
			this.setState({
				myComments: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	
	render() {
		const { user } = this.props.auth;
		const post = this.state.myPost;
		const comments = this.state.myComments;
		return(

		<div className={styles.root}>
			<Typography variant="h3">{post.post}</Typography>
			<h3>{post.author}</h3>

			{ comments && comments.map(({_id, author, authorID, content}) => (
			 	<Grid item xs={12} sm={12}>
				 		 <h2>{author}: {content}</h2>
				 		 {user.id === authorID &&
                         <Button onClick={this.onDeleteClick.bind(this, _id)}>
							Delete
						 </Button>
				 		 	}
		             </Grid>
			  		))}


			 <ul>
                <li key={user.name+1}>
                  <FormControl margin="normal">
		              <InputLabel htmlFor="comment">Enter Your A Comment</InputLabel>
		              <Input 
		                onChange={this.onChange}
		                value={this.state.comment}
		                id="comment" 
		                name="comment" 
		                autoComplete="autoFocus"/>
		            </FormControl>
                        </li>
               <li key='2'> 
               	<Button onClick={this.onAddClick.bind(this, user)}>
					Add
				 </Button>
				 </li>
             </ul>
	    </div>
	    );
	  }
	}

QuestionPageComponent.propTypes = {
	getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default withStyles(styles)(connect(
	mapStateToProps
)(QuestionPageComponent));