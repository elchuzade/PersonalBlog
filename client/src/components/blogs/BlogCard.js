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
          <div className="blogCardDiv">
            <Link to={`/blogs/${blog.url}`}>
              <img
                className="card-img-top"
                src={
                  blog.avatar
                    ? `${blog.avatar.location}`
                    : 'https://picsum.photos/600/300'
                }
                alt="Main"
              />
            </Link>
          </div>
          <div className="card-body bloCardBody" style={{ minHeight: '240px' }}>
            <h5 className="card-title">
              <Link
                className="text-center blogCardTitle"
                to={`/blogs/${blog.url}`}
              >
                <h3>{blog.title}</h3>
              </Link>
            </h5>
            <div
              className="card-text text-center"
              dangerouslySetInnerHTML={{
                __html: blog.intro
              }}
            ></div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col text-left">
                <small className="text-muted">
                  <span>Posted on </span>
                  <Moment format="D MMM YYYY" withTitle>
                    {blog.createdAt}
                  </Moment>
                </small>
              </div>
              <div className="col text-right">
                <span className="mb-3">
                  <Link
                    className="btn btn-secondary btn-sm mb-2 mx-1 mb-md-0"
                    to={`/blogs/${blog.url}`}
                  >
                    check out
                  </Link>
                  {isAuthenticated && (
                    <React.Fragment>
                      <button
                        className="btn btn-secondary btn-sm mx-1 mb-2 mb-md-0 "
                        onClick={this.props.onEditBlogClick}
                      >
                        EDIT
                      </button>
                      <button
                        className="btn btn-dark btn-sm mx-1 mb-2 mb-md-0"
                        onClick={this.onDeleteBlog}
                      >
                        DELETE
                      </button>
                    </React.Fragment>
                  )}
                </span>
              </div>
            </div>
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
