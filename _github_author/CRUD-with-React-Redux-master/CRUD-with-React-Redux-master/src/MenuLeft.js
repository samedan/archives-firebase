import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

class MenuLeft extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  }

  handleDelete = post => {
    this.props.dispatch({ type: 'DELETE', id: post.id });
    const ref = firebase
      .database()
      .ref('users/' + post.key)
      .ref.remove();
  };

  render() {
    return (
      <div style={{ float: 'left', width: '180' }}>
        <ul className="collapsible" style={{ width: 180 }}>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">filter_drama</i>DAF
            </div>
            {this.props.posts.map(post => {
              if (post.type && post.type === 'DAF') {
                return (
                  <div className="collapsible-body" key={post.id}>
                    <Link to={`/frontpage/${post.id}`}>
                      <span>{post.title}</span>
                    </Link>
                  </div>
                );
              }
            })}
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">place</i>DRH
            </div>
            {this.props.posts.map(post => {
              if (post.type && post.type === 'DRH') {
                return (
                  <div className="collapsible-body" key={post.id}>
                    <Link to={`/frontpage/${post.id}`}>
                      <span>{post.title}</span>
                    </Link>
                  </div>
                );
              }
            })}
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">whatshot</i>DSI
            </div>
            {this.props.posts.map(post => {
              if (post.type && post.type === 'DSI') {
                return (
                  <div className="collapsible-body" key={post.id}>
                    <Link to={`/frontpage/${post.id}`}>
                      <span>{post.title}</span>
                    </Link>
                  </div>
                );
              }
            })}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  posts: state.posts
});
export default connect(mapStateToProps)(MenuLeft);
