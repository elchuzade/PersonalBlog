import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBlogs,
  addBlog,
  editBlog,
  deleteBlog
} from '../../actions/blogActions';
import { refreshErrors } from '../../actions/commonActions';
import BlogCard from '../blogs/BlogCard';

import NewBlogModal from './buildingBlocks/NewBlogModal';

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      modal: false,
      id: '',
      title: '',
      author: '',
      editBlog: false
    };
  }
  componentDidMount() {
    this.props.getBlogs();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      nextProps.response.action === 'add' ||
      nextProps.response.action === 'update'
    ) {
      if (this.state.modal) {
        this.setState({ modal: false });
      }
    }
  }
  onEditBlog = (e, blog) => {
    e.preventDefault();
    this.setState({
      id: blog._id,
      title: blog.title,
      author: blog.author,
      modal: true,
      editBlog: true
    });
  };
  toggleModal = e => {
    e.preventDefault();
    if (this.state.modal) {
      this.props.refreshErrors();
      this.setState({ modal: false });
    }
  };
  onChange = e => {
    e.preventDefault();
    let errorsUpdate = {};
    if (this.state.errors[`${e.target.name}`]) {
      errorsUpdate = this.state.errors;
      delete errorsUpdate[`${e.target.name}`];
    }
    this.setState({ [e.target.name]: e.target.value, errors: errorsUpdate });
  };
  openModal = e => {
    e.preventDefault();
    if (!this.state.modal) {
      this.setState({ modal: true, editBlog: false });
    }
  };
  submitModal = e => {
    e.preventDefault();
    const newBlog = {
      title: this.state.title,
      author: this.state.author
    };
    if (this.state.editBlog) {
      this.props.editBlog(this.state.id, newBlog);
    } else {
      this.props.addBlog(newBlog);
    }
  };
  resetModal = () => {
    this.setState({
      editBlog: false,
      modal: false,
      title: '',
      author: ''
    });
  };
  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const { blogs, loading } = this.props.blogs;
    let spinner = null;
    if (blogs === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        <section id="blogs">
          <div className="container">
            <div className="row my-3">
              <div className="col-12">
                <h3 className="text-center">
                  {isAuthenticated && (
                    <button
                      className="btn btn-info mr-3"
                      onClick={this.openModal}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  )}
                  Blogs
                </h3>
              </div>
            </div>
            {spinner}
            {!spinner && (
              <React.Fragment>
                <div className="row">
                  {blogs.map(blog => (
                    <div key={blog._id} className="col-12 col-md-6 mb-3">
                      <BlogCard
                        key={blog._id}
                        blog={blog}
                        onEditBlogClick={e => {
                          this.onEditBlog(e, blog);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        </section>
        {/* MODAL */}
        <NewBlogModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          resetModal={this.resetModal}
          submitModal={this.submitModal}
          title={this.state.title}
          onChange={this.onChange}
          errors={errors}
          author={this.state.author}
          editBlog={this.state.editBlog}
        />
      </div>
    );
  }
}

Blogs.propTypes = {
  auth: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  refreshErrors: PropTypes.func.isRequired,
  editBlog: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  blogs: state.blogs,
  auth: state.auth,
  response: state.response
});

export default connect(
  mapStateToProps,
  { getBlogs, editBlog, deleteBlog, refreshErrors, addBlog }
)(Blogs);
