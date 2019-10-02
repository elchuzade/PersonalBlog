import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions/blogActions';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class BlogCard extends Component {
  onDeleteBlog = e => {
    e.preventDefault();
    this.props.deleteBlog(this.props.blog._id);
  };

  render() {
    const { blog } = this.props;
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="card">
          <Link to={`/blogs/${blog._id}`}>
            <img
              className="card-img-top"
              src={
                blog.avatar
                  ? `${blog.avatar.location}`
                  : 'https://picsum.photos/600/200'
              }
              alt="Main"
            />
          </Link>
          <div className="card-body" style={{ minHeight: '240px' }}>
            <h5 className="card-title">
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </h5>
            <p className="card-text">
              {blog.intro.length < 30 ? (
                blog.intro
              ) : (
                <span>{blog.intro.substring(0, 200)}...</span>
              )}
            </p>
            <span className="mb-3">
              <Link
                className="btn btn-info btn-sm mb-2 mx-1 mb-md-0"
                to={`/blogs/${blog._id}`}
              >
                check out
              </Link>
              {isAuthenticated && (
                <React.Fragment>
                  <button
                    className="btn btn-warning btn-sm mx-1 mb-2 mb-md-0 "
                    onClick={this.props.onEditBlogClick}
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1 mb-2 mb-md-0"
                    onClick={this.onDeleteBlog}
                  >
                    DELETE
                  </button>
                </React.Fragment>
              )}
            </span>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              <span>Posted on </span>
              <Moment format="D MMM YYYY" withTitle>
                {blog.createdAt}
              </Moment>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

BlogCard.propTypes = {
  auth: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  onEditBlogClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteBlog }
)(BlogCard);
