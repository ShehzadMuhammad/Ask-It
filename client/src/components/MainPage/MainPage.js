import React, { Component } from 'react';

import  AppNavBar  from './AppNavBar';
import PostComponent from './PostComponent';
import QuestionPageComponent from './QuestionPageComponent';

import { Route } from 'react-router-dom';

class MainPage extends Component {

  render() {

    return (
    	<div>
        <AppNavBar />
        <Route exact path="/home" component={PostComponent} />
        <Route path="/home/:question" component={QuestionPageComponent} />
        </div>
    );
  }
}

export default MainPage;