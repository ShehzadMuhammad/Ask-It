import React, { Component } from 'react';
import './App.css';

import MainPage  from './components/MainPage/MainPage';
import LoginPage from './components/Login/LoginPage';
import Register from './components/Login/Register';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/privateRoute/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <div className="App">
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={Register} />
      <Switch>
        <PrivateRoute path="/home" component={MainPage} />
      </Switch>
      </div>
      </Provider>
    );
  }
}

export default App;
