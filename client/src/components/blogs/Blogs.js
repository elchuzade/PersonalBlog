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
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../common/TextInput';
import TextareaInput from '../common/TextareaInput';
import BlogCard from '../blogs/BlogCard';

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      modal: false,
      id: '',
      title: '',
      intro: '',
      author: ''
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
      intro: blog.intro,
      author: blog.author,
      modal: true,
      edit: true
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
      this.setState({ modal: true });
    }
  };
  submitModal = e => {
    e.preventDefault();
    const newBlog = {
      title: this.state.title,
      intro: this.state.intro,
      author: this.state.author
    };
    if (this.state.edit) {
      this.props.editBlog(this.state.id, newBlog);
    } else {
      this.props.addBlog(newBlog);
    }
  };
  resetModal = () => {
    this.setState({
      modal: false,
      title: '',
      intro: '',
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
                      <div
                        key={blog._id}
                        className="col-12 col-md-6 col-lg-4 mb-3"
                      >
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          size="lg"
          onClosed={this.resetModal}
        >
          <form onSubmit={this.submitModal}>
            <ModalHeader className="text-info">
              {this.state.edit ? <span>Edit</span> : <span>Add</span>} Blog
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <TextInput
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        placeholder="title"
                        label="title"
                        error={errors.title}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <TextareaInput
                        name="intro"
                        value={this.state.intro}
                        onChange={this.onChange}
                        placeholder="intro"
                        label="intro"
                        error={errors.intro}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <TextInput
                        name="author"
                        value={this.state.author}
                        onChange={this.onChange}
                        placeholder="author"
                        label="author"
                        error={errors.author}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn mainButton" type="submit">
                Submit
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={this.toggleModal}
              >
                Cancel
              </button>
            </ModalFooter>
          </form>
        </Modal>
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
