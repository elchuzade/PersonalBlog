import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Overlay from '../common/Overlay';
import SectionEditDashboard from '../dashboard/SectionEditDashboard';
import FileInputGroup from '../common/FileInputGroup';
import TextInput from '../common/TextInput';
import TextareaInput from '../common/TextareaInput';
import isEmpty from '../../validation/is-empty';
import {
  getBlog,
  uploadBlogAvatar,
  deleteBlogAvatar,
  updateBlog,
  deleteBlog
} from '../../actions/blogActions';
import ReactQuill from 'react-quill';
import Moment from 'react-moment';

class BlogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarObject: {},
      errors: {},
      name: '',
      intro: '',
      description: '',
      _id: '',
      avatar: '',
      createdAt: ''
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
    if (nextProps.blog.blog) {
      const { blog } = nextProps.blog;
      blog.title =
        !isEmpty(blog.title) && !nextProps.errors.blogName ? blog.title : '';
      blog.intro =
        !isEmpty(blog.intro) && !nextProps.errors.blogIntro ? blog.intro : '';
      blog.description =
        !isEmpty(blog.description) && !nextProps.errors.blogDescription
          ? blog.description
          : '';
      blog.avatar = !isEmpty(blog.avatar) ? blog.avatar : '';
      blog._id = !isEmpty(blog._id) ? blog._id : '';
      this.setState({
        title: blog.title,
        intro: blog.intro,
        description: blog.description,
        avatar: blog.avatar,
        _id: blog._id,
        createdAt: blog.createdAt
      });
    }
  }
  onChangeQuill = value => {
    this.setState({ description: value });
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
  onSubmit = e => {
    e.preventDefault();
    const blogData = {
      title: this.state.title,
      intro: this.state.intro,
      description: this.state.description,
      avatar: this.state.avatar,
      _id: this.state._id
    };
    this.props.updateBlog(
      blogData,
      this.props.history,
      this.state.avatarObject,
    );
  };
  onDeleteBlog = e => {
    e.preventDefault();
    this.props.deleteBlog(this.state._id, this.props.history);
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
  onClickDeleteAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name || this.state.avatar) {
      this.props.deleteBlogAvatar(this.props.blog.blog._id);
      this.setState({ avatarObject: {}, avatar: '' });
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'No image to delete';
      this.setState({ errors: updatedErrors });
    }
  };

  render() {
    const { errors } = this.state;
    const { blog, loading } = this.props.blog;
    let spinner = null;
    if (blog === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        {spinner}
        {!spinner && (
          <React.Fragment>
            {/* <Overlay header="EDIT BLOG" /> */}
            <SectionEditDashboard
              name="BLOG"
              onDelete={this.onDeleteBlog}
              onSave={this.onSubmit}
            />
            <section id="editBlogImages">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-12 col-lg-4">
                    <img
                      src={
                        this.state.avatar
                          ? `${this.state.avatar.location}`
                          : 'https://picsum.photos/300/300'
                      }
                      alt="Main"
                      className="img-fluid"
                      style={{ width: '100%', height: '300px' }}
                    />
                    <form onSubmit={this.onSubmitAvatar}>
                      <FileInputGroup
                        name="blogAvatar"
                        placeholder="Front Page Picture"
                        onChange={this.onChangeAvatar}
                        sendFile={this.state.avatarObject}
                        error={errors.avatar}
                        accept="image/png, image/jpg, image/jpeg"
                      />
                      <small className="text-muted">
                        This image will be shown in all blog posts page
                      </small>
                      <div className="row mt-2 mb-5">
                        <div className="col">
                          <button
                            className="btn btn-danger mx-2"
                            onClick={this.onClickDeleteAvatar}
                          >
                            Delete
                          </button>
                          <button className="btn mx-2 mainButton" type="submit">
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 col-lg-8">
                    <img
                      src={
                        this.state.cover
                          ? `${this.state.cover.location}`
                          : 'https://picsum.photos/600/300'
                      }
                      alt="Cover"
                      className="img-fluid"
                      style={{ width: '100%', height: '300px' }}
                    />
                    <form onSubmit={this.onSubmitCover}>
                      <FileInputGroup
                        name="blogCover"
                        placeholder="Cover Picture"
                        onChange={this.onChangeCover}
                        sendFile={this.state.coverObject}
                        error={errors.cover}
                        accept="image/png, image/jpg, image/jpeg, image/gif, image/x-eps, application/pdf, .doc, .docx"
                      />
                      <small className="text-muted">
                        This image will be shown in this blog post's page
                      </small>
                      <div className="row mt-2 mb-5">
                        <div className="col">
                          <button
                            className="btn btn-danger mx-2"
                            onClick={this.onClickDeleteCover}
                          >
                            Delete
                          </button>
                          <button className="btn mx-2 mainButton" type="submit">
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            <section id="editBlogBody">
              <div className="container">
                <div className="row">
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
                        value={this.state.description}
                        onChange={this.onChangeQuill}
                      />
                      <small className="text-muted">Blog description</small>
                    </div>
                    <div className="col-12 form-group text-center">
                      <button
                        className="btn btn-lg w-25 mainButton"
                        type="submit"
                      >
                        Save
                      </button>
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
              </div>
            </section>
          </React.Fragment>
        )}
      </div>
    );
  }
}

BlogEdit.propTypes = {
  blog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBlog: PropTypes.func.isRequired,
  uploadBlogAvatar: PropTypes.func.isRequired,
  uploadBlogCover: PropTypes.func.isRequired,
  deleteBlogAvatar: PropTypes.func.isRequired,
  deleteBlogCover: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  blog: state.blog
});

export default connect(
  mapStateToProps,
  {
    getBlog,
    uploadBlogAvatar,
    uploadBlogCover,
    deleteBlogAvatar,
    deleteBlogCover,
    updateBlog,
    deleteBlog
  }
)(withRouter(BlogEdit));
