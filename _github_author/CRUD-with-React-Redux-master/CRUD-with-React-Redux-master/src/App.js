import React, { Component } from 'react';

import firebase from './firebase';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Post from './Post';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import FrontPage from './FrontPage';
import AnnoncePage from './AnnoncePage';
import MenuLeft from './MenuLeft';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <a href="/">
            <h2 className="center " style={{ float: 'left' }}>
              Post It
            </h2>
          </a>
          <a href="/frontpage" style={{ float: 'right' }}>
            FrontPage/Menu
          </a>
        </div>

        <Router>
          <div>
            <Route exact path="/" component={LogIn} />
            <Route path="/frontpage" component={FrontPage} />
            <Route exact path="/frontpage/:id" component={AnnoncePage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Post} />
            <Route exact path="/menuleft" component={MenuLeft} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authed: state.authed
});

export default connect(mapStateToProps)(App);
