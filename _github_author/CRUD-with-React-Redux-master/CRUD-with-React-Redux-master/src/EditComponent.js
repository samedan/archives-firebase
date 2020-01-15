import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';

class EditComponent extends Component {
  handleFinalEdit = e => {
    e.preventDefault();
    const title = this.getTitleInput.value;
    const type = this.getTypeInput.value;
    const message = this.getMessageInput.value;
    const version = this.getVersionInput.value;
    const lien = this.getLienInput.value;
    const dateAdded = this.getDateInput.value;

    this.props.dispatch({ type: 'CLEAR_ERROR', id: this.props.post.id });

    if (title.length === 0 || title.length <= 5 || title.trim() === '') {
      this.props.dispatch({
        type: 'POST_EDIT_ERROR',
        message: 'Title has to be more than 5 characters',
        id: this.props.post.id
      });
      this.forceUpdate();
      return;
    }
    if (message.length === 0 || message.length <= 10 || message.trim() === '') {
      this.props.dispatch({
        type: 'POST_EDIT_ERROR',
        message: 'Message has to be more than 10 characters',
        id: this.props.post.id
      });
      this.forceUpdate();
      return;
    }
    this.props.dispatch({
      type: 'ADD_EDIT_POST',
      data: {
        id: this.props.post.id,
        title,
        type,
        message,
        version,
        lien,
        dateAdded,
        editing: this.props.post.editing
      }
    });
    let updates = {};

    updates['users/' + this.props.post.key] = this.props.post;
    updates['users/' + this.props.post.key].title = title;
    updates['users/' + this.props.post.key].type = type;
    updates['users/' + this.props.post.key].message = message;
    updates['users/' + this.props.post.key].version = version;
    updates['users/' + this.props.post.key].lien = lien;
    updates['users/' + this.props.post.key].dateAdded = dateAdded;
    firebase
      .database()
      .ref()
      .update(updates);
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleFinalEdit}>
        <h3 className="all_post_heading">Edit Post</h3>
        <input
          type="text"
          ref={input => (this.getTitleInput = input)}
          defaultValue={this.props.post.title}
        />{' '}
        <br />
        <p style={{ color: '#636363', fontSize: '14px' }}>Type</p>
        <select
          style={{ display: 'block' }}
          ref={input => (this.getTypeInput = input)}
          defaultValue={this.props.post.type}
        >
          <option defaultValue="">--Choose--</option>
          <option value="DAF">DAF</option>
          <option value="DRH">DRH</option>
          <option value="DSI">DSI</option>
        </select>
        <br />
        <input
          type="text"
          ref={input => (this.getVersionInput = input)}
          defaultValue={this.props.post.version}
        />{' '}
        <br />
        <input
          type="text"
          ref={input => (this.getLienInput = input)}
          defaultValue={this.props.post.lien}
        />{' '}
        <br />
        <input
          type="text"
          ref={input => (this.getDateInput = input)}
          defaultValue={this.props.post.dateAdded}
        />{' '}
        <br />
        <textarea
          ref={input => (this.getMessageInput = input)}
          defaultValue={this.props.post.message}
          cols="28"
          rows="5"
        ></textarea>
        <br />
        <button>Edit</button>
        {console.log(this.props.post.errorMessage)}
        {this.props.post.errorMessage ? (
          <p style={{ color: '#ff7777' }}>{this.props.post.errorMessage}</p>
        ) : null}
      </form>
    );
  }
}

export default connect()(EditComponent);
