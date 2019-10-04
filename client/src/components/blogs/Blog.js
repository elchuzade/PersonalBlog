import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBlog,
  uploadBlogAvatar,
  deleteBlogAvatar,
  editBlog,
  editTextElement,
  deleteTextElement,
  addTextElement
} from '../../actions/blogActions';
import Moment from 'react-moment';
import { refreshErrors } from '../../actions/commonActions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FileInputGroup from '../common/FileInputGroup';
import TextInput from '../common/TextInput';
import ReactQuill from 'react-quill';

import Dashboard from './buildingBlocks/Dashboard';
import ShowEditAvatar from './buildingBlocks/ShowEditAvatar';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      intro: '',
      body: [],
      avatar: '',
      _id: '',
      author: '',
      createdAt: '',
      text: '',
      elementId: '',
      avatarObject: {},
      imageObject: {},
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
        avatar: blog.avatar,
        _id: blog._id,
        author: blog.author,
        createdAt: blog.createdAt,
        editBlog: false
      });
    }
  }
  openModal = e => {
    e.preventDefault();
    if (!this.state.modal) {
      this.setState({ modal: true });
    }
  };
  submitModal = e => {
    e.preventDefault();
    let obj = {};
    obj.text = this.state.text;
    if (this.state.editBlog) {
      this.props.editTextElement(this.state._id, this.state.elementId, obj);
    } else {
      this.props.addTextElement(this.state._id, obj);
    }
    this.resetModal();
  };
  resetModal = () => {
    this.setState({
      modal: false,
      text: ''
    });
  };
  toggleModal = e => {
    e.preventDefault();
    if (this.state.modal) {
      this.props.refreshErrors();
      this.setState({ modal: false });
    }
  };
  DeleteTextElement = (e, elementId) => {
    e.preventDefault();
    this.props.deleteTextElement(this.state._id, elementId);
  };
  onChangeQuill = value => {
    this.setState({ intro: value });
  };
  onChangeTextElementQuill = value => {
    this.setState({ text: value });
  };
  OpenTextElementModal = (e, id, text) => {
    e.preventDefault();
    this.setState({ elementId: id, text: text, modal: true });
  };
  onSubmit = e => {
    e.preventDefault();
    const blogData = {
      title: this.state.title,
      intro: this.state.intro,
      author: this.state.author
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
    console.log('object');
    console.log(e.target.files[0]);
    e.preventDefault();
    this.setState({ avatarObject: e.target.files[0] });
    if (this.state.errors && this.state.errors.avatar) {
      let updatedErrors = this.state.errors;
      delete updatedErrors.avatar;
      this.setState({ errors: updatedErrors }, () => {
        console.log(this.state.avatarObject);
      });
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
      this.props.uploadBlogAvatar(formData, configData, this.state._id);
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'Choose image to upload';
      this.setState({ errors: updatedErrors });
    }
  };
  onDeleteAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name || this.props.blogs.blog.avatar) {
      this.props.deleteBlogAvatar(this.state._id);
      this.setState({ avatarObject: {}, avatar: '' });
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'No image to delete';
      this.setState({ errors: updatedErrors });
    }
  };
  // FIX ERRORS LATER
  onChangeImage = e => {
    e.preventDefault();
    this.setState({ imageObject: e.target.files[0] });
    if (this.state.errors && this.state.errors.image) {
      let updatedErrors = this.state.errors;
      delete updatedErrors.image;
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
                <Dashboard
                  editBlog={this.state.editBlog}
                  toggleEdit={this.toggleEdit}
                  onSubmit={this.onSubmit}
                />
              </div>
              <div className="container">
                {/* AVATAR */}
                <div className="row mb-5">
                  <ShowEditAvatar
                    avatar={blog.avatar}
                    isAuthenticated={isAuthenticated}
                    editBlog={this.state.editBlog}
                    onSubmitAvatar={this.onSubmitAvatar}
                    onChangeAvatar={this.onChangeAvatar}
                    onDeleteAvatar={this.onDeleteAvatar}
                    errors={errors}
                    avatarObject={this.state.avatarObject}
                  />
                </div>
                {/* DETAILS IF ELSE ADMIN*/}
                {isAuthenticated && this.state.editBlog ? (
                  <div>
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
                          <ReactQuill
                            value={this.state.intro || ''}
                            onChange={this.onChangeQuill}
                          />
                          <small className="text-muted">
                            Blog introduction
                          </small>
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
                    <div className="col-12">
                      {blog.body.map(element => (
                        <div key={element._id}>
                          {element.type == 'text' ? (
                            <div>
                              <div
                                className="lead text-center mx-2 mx-md-5"
                                dangerouslySetInnerHTML={{
                                  __html: element.text
                                }}
                              ></div>
                              <div className="row mt-2 mb-5">
                                <div className="col">
                                  <button
                                    className="btn btn-danger mx-2"
                                    onClick={(e, id = element._id) =>
                                      this.DeleteTextElement(e, id)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="btn btn-info mx-2"
                                    onClick={(
                                      e,
                                      id = element._id,
                                      text = element.text
                                    ) => this.OpenTextElementModal(e, id, text)}
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <img
                                src={
                                  element.image.location
                                    ? element.image.location
                                    : 'https://picsum.photos/1200/300'
                                }
                                alt="image"
                                className="img-fluid"
                              />
                              <form onSubmit={this.onSubmitImage}>
                                <FileInputGroup
                                  name="blogImage"
                                  placeholder="Image"
                                  onChange={this.onChangeImage}
                                  sendFile={this.state.imageObject}
                                  error={errors.image}
                                  accept="image/png, image/jpg, image/jpeg"
                                />
                                <div className="row mt-2 mb-5">
                                  <div className="col">
                                    <button
                                      className="btn btn-danger mx-2"
                                      onClick={this.onDeleteImage}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-info mx-2"
                                      type="submit"
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
                      <div
                        className="lead text-center mx-2 mx-md-5"
                        dangerouslySetInnerHTML={{
                          __html: this.state.intro
                        }}
                      ></div>
                    </div>
                    <div className="col-12">
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
                              <div
                                className="lead text-center mx-2 mx-md-5"
                                dangerouslySetInnerHTML={{
                                  __html: element.text
                                }}
                              ></div>
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          size="lg"
          onClosed={this.resetModal}
        >
          <form onSubmit={this.submitModal}>
            <ModalHeader className="text-info">
              {this.state.edit ? <span>Edit</span> : <span>Add</span>} Element
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <ReactQuill
                        value={this.state.text || ''}
                        onChange={this.onChangeTextElementQuill}
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
        <div className="row my-3">
          <div className="col-12">
            <h3 className="text-center">
              {isAuthenticated && (
                <button className="btn btn-info mr-3" onClick={this.openModal}>
                  <i className="fas fa-plus" />
                </button>
              )}
              Text Element
            </h3>
          </div>
        </div>
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
  errors: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  editTextElement: PropTypes.func.isRequired,
  deleteTextElement: PropTypes.func.isRequired,
  addTextElement: PropTypes.func.isRequired,
  refreshErrors: PropTypes.func.isRequired
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
    editBlog,
    editTextElement,
    deleteTextElement,
    addTextElement,
    refreshErrors
  }
)(Blog);
