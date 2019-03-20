import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

  onSubmit = e => {
      e.preventDefault();

  const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };

  this.props.registerUser(newUser, this.props.history); 
  };

  render() {
  const { errors } = this.state;
  const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
           <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input 
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name" 
                name="name" 
                autoComplete="autoFocus"
                className={classnames("", {
                    invalid: errors.name
                  })}
              />
            <span className="red-text">{errors.name}</span>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email" 
                name="email" 
                autoComplete="email"
                className={classnames("", {
                    invalid: errors.email
                  })} 
                autoFocus />
                <span className="red-text">{errors.email}</span>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                name="password" 
                type="password" 
                id="password"
                className={classnames("", {
                    invalid: errors.password
                  })} 
                autoComplete="current-password" />
              <span className="red-text">{errors.password}</span>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input 
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                name="password2" 
                type="password" 
                id="password2"
                className={classnames("", {
                    invalid: errors.password2
                  })} 
                autoComplete="confirm-password" />
                <span className="red-text">{errors.password2}</span>
            </FormControl>

             <Button  
              onClick={this.onSubmit}
              component={Link} to="/login"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit 
            </Button>

            <Button
              component={Link} to="/login"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Back
            </Button>

          </form>
        </Paper>
      </main>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(connect(
  mapStateToProps, 
  { registerUser }
)(withRouter(Register)));
