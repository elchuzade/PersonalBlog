import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBlog,
  uploadBlogAvatar,
  deleteBlogAvatar,
  editBlog
} from '../../actions/blogActions';
import Moment from 'react-moment';
import FileInputGroup from '../common/FileInputGroup';
import TextInput from '../common/TextInput';
import TextareaInput from '../common/TextareaInput';
import ReactQuill from 'react-quill';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      intro: '',
      body: '',
      description: '',
      avatar: '',
      _id: '',
      author: '',
      createdAt: '',
      avatarObject: {},
      errors: {},
      editBlog: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getBlog(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.blogs.blog) {
      const { blog } = nextProps.blogs;
      this.setState({
        title: blog.title,
        intro: blog.intro,
        body: blog.body,
        description: blog.description,
        avatar: blog.avatar,
        _id: blog._id,
        author: blog.author,
        createdAt: blog.createdAt,
        editBlog: false
      });
    }
  }
  onChangeQuill = value => {
    this.setState({ description: value });
  };
  onSubmit = e => {
    e.preventDefault();
    const blogData = {
      title: this.state.title,
      intro: this.state.intro,
      body: this.state.body,
      author: this.state.author,
      description: this.state.description
    };
    this.props.editBlog(this.state._id, blogData);
  };
  toggleEdit = e => {
    e.preventDefault();
    this.setState({ editBlog: !this.state.editBlog });
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
  onChangeAvatar = e => {
    e.preventDefault();
    this.setState({ avatarObject: e.target.files[0] });
    if (this.state.errors && this.state.errors.avatar) {
      let updatedErrors = this.state.errors;
      delete updatedErrors.avatar;
      this.setState({ errors: updatedErrors });
    }
  };
  onSubmitAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name) {
      const formData = new FormData();
      formData.append('blogAvatar', this.state.avatarObject);
      const configData = {
        headers: {
          'content-type': 'multipart/form/data'
        }
      };
      this.props.uploadBlogAvatar(
        formData,
        configData,
        this.props.blogs.blog._id
      );
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'Choose image to upload';
      this.setState({ errors: updatedErrors });
    }
  };
  onDeleteAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name || this.props.blogs.blog.avatar) {
      this.props.deleteBlogAvatar(this.props.blogs.blog._id);
      this.setState({ avatarObject: {}, avatar: '' });
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'No image to delete';
      this.setState({ errors: updatedErrors });
    }
  };

  render() {
    const { blog, loading } = this.props.blogs;
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    let spinner = null;
    if (blog === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        {!spinner && (
          <React.Fragment>
            <section id="blog">
              <div className="dashboard">
                {isAuthenticated && (
                  <React.Fragment>
                    {this.state.editBlog ? (
                      <React.Fragment>
                        <button
                          className="btn btn-info m-2 py-3 text-white"
                          style={{ minWidth: '48px' }}
                          onClick={this.toggleEdit}
                        >
                          <i className="fas fa-eye" />
                        </button>
                        <br />
                        <button
                          className="btn btn-success m-2 py-3 text-white"
                          style={{ minWidth: '48px' }}
                          onClick={this.onSubmit}
                        >
                          <i className="fas fa-save" />
                        </button>
                      </React.Fragment>
                    ) : (
                      <button
                        className="btn btn-warning m-2 py-3 text-white"
                        style={{ minWidth: '48px' }}
                        onClick={this.toggleEdit}
                      >
                        <i className="fas fa-pen" />
                      </button>
                    )}
                  </React.Fragment>
                )}
              </div>
              <div className="container">
                {/* AVATAR */}
                <div className="row mb-5">
                  <div className="col-12 text-center">
                    <img
                      src={
                        blog.avatar
                          ? blog.avatar.location
                          : 'https://picsum.photos/1200/300'
                      }
                      alt="avatar"
                      className="img-fluid"
                    />
                    {isAuthenticated && this.state.editBlog && (
                      <form onSubmit={this.onSubmitAvatar}>
                        <FileInputGroup
                          name="blogAvatar"
                          placeholder="Avatar"
                          onChange={this.onChangeAvatar}
                          sendFile={this.state.avatarObject}
                          error={errors.avatar}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                        <small className="text-muted">
                          This image will be shown in all blogs page and landing
                          page
                        </small>
                        <div className="row mt-2 mb-5">
                          <div className="col">
                            <button
                              className="btn btn-danger mx-2"
                              onClick={this.onDeleteAvatar}
                            >
                              Delete
                            </button>
                            <button className="btn btn-info mx-2" type="submit">
                              Upload
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                {/* DETAILS IF ELSE ADMIN*/}
                {isAuthenticated && this.state.editBlog ? (
                  <div className="row mb-3">
                    <form className="w-100" onSubmit={this.onSubmit}>
                      <div className="col-12 form-group">
                        <TextInput
                          value={this.state.title}
                          onChange={this.onChange}
                          name="title"
                          extraClass="text-center"
                          placeholder="Blog Title"
                          error={errors.blogName}
                        />
                        <small className="text-muted">Blog title</small>
                      </div>
                      <div className="col-12 form-group">
                        <TextareaInput
                          name="intro"
                          value={this.state.intro}
                          onChange={this.onChange}
                          placeholder="Blog Introduction"
                          error={errors.blogIntro}
                          extraClass="text-center"
                        />
                        <small className="text-muted">Blog introduction</small>
                      </div>
                      <div className="col-12 form-group">
                        <ReactQuill
                          value={this.state.description || ''}
                          onChange={this.onChangeQuill}
                        />
                        <small className="text-muted">Blog description</small>
                      </div>
                      <div>
                        <p className="text-muted">
                          <i>
                            <span>Posted on </span>
                            <Moment format="D MMM YYYY" withTitle>
                              {this.state.createdAt}
                            </Moment>
                          </i>
                        </p>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="row mb-3">
                    <div className="col-12 text-center">
                      <h2 className="mt-3">{this.state.title}</h2>
                    </div>
                    <div className="col-12 text-center">
                      <p className="text-muted mt-3">by {this.state.author}</p>
                    </div>
                    <div className="col-12">
                      <p className="lead text-center mx-2 mx-md-5">
                        {this.state.intro}
                      </p>
                      <div
                        className="mx-2 mx-md-5"
                        dangerouslySetInnerHTML={{
                          __html: this.state.description
                        }}
                      />
                      <p className="text-muted mx-2 mx-md-5 mt-2">
                        <i>
                          <span>Posted on </span>
                          <Moment format="D MMM YYYY" withTitle>
                            {this.state.createdAt}
                          </Moment>
                        </i>
                      </p>
                    </div>
                    <div className="col-12">
                      {blog.body.map(element => (
                        <div key={element._id}>
                          {element.type == 'text' ? (
                            <div>
                              <p>{element.text}</p>
                            </div>
                          ) : (
                            <div>
                              <img
                                src={element.image.location}
                                alt="image icon"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Blog.propTypes = {
  auth: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired,
  getBlog: PropTypes.func.isRequired,
  uploadBlogAvatar: PropTypes.func.isRequired,
  deleteBlogAvatar: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  {
    getBlog,
    uploadBlogAvatar,
    deleteBlogAvatar,
    editBlog
  }
)(Blog);
