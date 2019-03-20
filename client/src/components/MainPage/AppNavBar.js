import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import AddPostDialog from './AddPostDialog';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "15px"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class AppNavBar extends React.Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar  color="secondary" position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
            Welcome {user.name.split(" ")[0]}
            </Typography>
            <AddPostDialog author={user.name.split(" ")[0]} authorID={user.id} />
           
              <Button component={Link} to="/home">Home</Button>
              <Button  onClick={this.onLogoutClick}>Logout</Button>
              
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(connect(
  mapStateToProps, 
  { logoutUser }
)(AppNavBar));

