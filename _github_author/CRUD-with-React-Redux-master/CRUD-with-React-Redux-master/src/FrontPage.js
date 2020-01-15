import React, { Component } from 'react';
import AllPosts from './AllPosts.js';

import { connect } from 'react-redux';

import firebase from './firebase';
import { withRouter, Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization';

import generateId from './utils';
import MenuLeft from './MenuLeft.js';
class FrontPage extends Component {
  componentDidMount() {
    const ref = firebase.database().ref('users/');

    this.props.dispatch({ type: 'LOADING_TRUE' });
    ref.on('value', snapshot => {
      if (snapshot.val() === null) {
        this.props.dispatch({ type: 'LOADING_FALSE' });
        return;
      }
      [...Object.values(snapshot.val())].map(post => {
        this.props.dispatch({ type: 'ADD_POST', data: post });
        this.props.dispatch({ type: 'LOADING_FALSE' });
      });
    });
  }

  render() {
    return (
      <div className="post-grid">
        <h1>FrontPage</h1>
        <MenuLeft posts={this.props.posts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors
});
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(
  connect(mapStateToProps)(FrontPage)
);
