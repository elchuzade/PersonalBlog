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
  addTextElement,
  editElementImage,
  deleteElementImage,
  addElementImage
} from '../../actions/blogActions';
import { refreshErrors } from '../../actions/commonActions';

import BlogDashboard from './buildingBlocks/BlogDashboard';
import ShowEditAvatar from './buildingBlocks/ShowEditAvatar';
import ShowEditDetails from './buildingBlocks/ShowEditDetails';
import TextElementModal from './buildingBlocks/TextElementModal';
import ShowEditTextImageElement from './buildingBlocks/ShowEditTextImageElement';
import TextImageDashboard from './buildingBlocks/TextImageDashboard';

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
  onDeleteImage = (e, id) => {
    e.preventDefault();
    this.props.deleteElementImage(this.state._id, id);
    this.setState({ imageObject: {} });
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
  // Edit submit image
  onSubmitImage = (e, id) => {
    e.preventDefault();
    if (this.state.imageObject.name) {
      const formData = new FormData();
      formData.append('blogImage', this.state.imageObject);
      const configData = {
        headers: {
          'content-type': 'multipart/form/data'
        }
      };
      this.props.editElementImage(formData, configData, this.state._id, id);
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.image = 'Choose image to upload';
      this.setState({ errors: updatedErrors });
    }
  };
  // Add new submit image
  onSubmitNewImage = e => {
    e.preventDefault();
    if (this.state.imageObject.name) {
      const formData = new FormData();
      formData.append('blogImage', this.state.imageObject);
      const configData = {
        headers: {
          'content-type': 'multipart/form/data'
        }
      };
      this.props.addElementImage(formData, configData, this.state._id);
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.image = 'Choose image to upload';
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
            {isAuthenticated && (
              <section id="dashboard">
                <BlogDashboard
                  editBlog={this.state.editBlog}
                  toggleEdit={this.toggleEdit}
                  onSubmit={this.onSubmit}
                />
              </section>
            )}
            <div className="container">
              {/* AVATAR */}
              <section id="showEditAvatar">
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
              </section>
              {/* DETAILS IF ELSE ADMIN*/}
              <section id="blogDetails">
                <ShowEditDetails
                  onSubmit={this.onSubmit}
                  title={this.state.title}
                  onChange={this.onChange}
                  errors={errors}
                  intro={this.state.intro}
                  onChangeQuill={this.onChangeQuill}
                  createdAt={this.state.createdAt}
                  isAuthenticated={isAuthenticated}
                  editBlog={this.state.editBlog}
                  author={this.state.author}
                />
              </section>
              <section id="element">
                <ShowEditTextImageElement
                  isAuthenticated={isAuthenticated}
                  editBlog={this.state.editBlog}
                  body={this.state.body}
                  DeleteTextElement={this.DeleteTextElement}
                  OpenTextElementModal={this.OpenTextElementModal}
                  onChangeImage={this.onChangeImage}
                  onDeleteImage={this.onDeleteImage}
                  imageObject={this.state.imageObject}
                  errors={errors}
                  onSubmitImage={this.onSubmitImage}
                />
              </section>
              <section id="textModal">
                <TextElementModal
                  modal={this.state.modal}
                  toggleModal={this.toggleModal}
                  resetModal={this.resetModal}
                  submitModal={this.submitModal}
                  editBlog={this.state.editBlog}
                  text={this.state.text}
                  onChangeTextElementQuill={this.onChangeTextElementQuill}
                />
              </section>
              <section id="textImageDashboard">
                <TextImageDashboard
                  isAuthenticated={isAuthenticated}
                  openModal={this.openModal}
                  onSubmitNewImage={this.onSubmitNewImage}
                  onChangeImage={this.onChangeImage}
                  imageObject={this.state.imageObject}
                  errors={errors}
                  onDeleteNewImage={this.onDeleteImage}
                />
              </section>
            </div>
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
  errors: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  editTextElement: PropTypes.func.isRequired,
  deleteTextElement: PropTypes.func.isRequired,
  addTextElement: PropTypes.func.isRequired,
  refreshErrors: PropTypes.func.isRequired,
  editElementImage: PropTypes.func.isRequired,
  deleteElementImage: PropTypes.func.isRequired,
  addElementImage: PropTypes.func.isRequired
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
    refreshErrors,
    editElementImage,
    deleteElementImage,
    addElementImage
  }
)(Blog);
