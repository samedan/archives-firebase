import React, { Component } from 'react';
import { connect } from 'react-redux';
import Iframe from 'react-iframe';
var Spinner = require('react-spinkit');

class AnnoncePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSpinner: true
    };
  }

  componentDidMount() {
    // console.log(this.props);
    console.log(this.props.match.params.id);
    // const { posts } = this.props;
    // const { posts } = this.props;
    // this.setState({ postsLoaded: posts });
    // console.log(post);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.location.state);
  }

  hideSpinner = () => {
    this.setState({
      loadingSpinner: false
    });
  };

  render() {
    const display = this.props.posts.map(post => {
      if (post.id === this.props.match.params.id) {
        console.log(post);
        return (
          <div key={post.key}>
            <p>Title: {post.title}</p>
            <p>Type: {post.type}</p>
            <p>Lien: {post.lien}</p>
            <p>Message: {post.message}</p>
            <p>Date: {post.dateAdded}</p>
            <p>Version: {post.version}</p>
            <div className="container rsvp-wrapper">
              <div className="container rsvp-wrapper"></div>
              {this.state.loadingSpinner ? (
                <Spinner
                  className="loading text-center"
                  name="three-bounce"
                  color="white"
                  fadeIn="none"
                />
              ) : null}
              <Iframe
                url={post.lien}
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                style={{ width: '100%' }}
                display="initial"
                position="relative"
                onLoad={this.hideSpinner}
                loadingSpinner={true}
              />
            </div>
          </div>
        );
      }
    });
    return (
      <div style={{ float: 'left', marginLeft: 30 }}>
        {/* <h2>Annonce </h2> */}
        {this.props.loading ? <p>Loading...</p> : <div>{display}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  loading: state.loading
});

export default connect(mapStateToProps)(AnnoncePage);
