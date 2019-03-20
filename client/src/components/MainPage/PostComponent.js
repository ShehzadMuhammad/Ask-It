import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../actions/postActions';


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


class PostComponent extends Component {

	componentDidMount(){
		this.props.getPosts();
	}

	onDeleteClick = (id) => {
		this.props.deletePost(id);
		alert('Post has been deleted');
	}

	render(){
		const { postItems } = this.props.postItem;
		const { user } = this.props.auth;
		return(

		<div className={styles.root}>
		
			<Grid container spacing={24}>
			 { postItems && postItems.map(({_id, author, authorID, post}) => (
			 	<Grid item xs={12} sm={3}>
			 		<Paper className={styles.paper}>
				 		<Typography variant="h6" align="center">{author}</Typography>
				 		 <h2>{post}</h2>
				 		 <Button component={Link} to={`/home/${_id}`}>View</Button>
				 		 {user.id === authorID &&
                         <Button onClick={this.onDeleteClick.bind(this, _id)}>
							Delete
						 </Button>
				 		 	}
				 		 </Paper>
		             </Grid>
			  		))}
			 	</Grid>
			</div>
		);
	}
}

PostComponent.propTypes = {
	getPosts: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	postItem: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	postItem: state.postItem,
	auth: state.auth
});

export default withStyles(styles)(connect(
	mapStateToProps, 
	{ getPosts, deletePost }
)(PostComponent));
