import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput';
import ReactQuill from 'react-quill';
import Moment from 'react-moment';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import modules from '../../common/exports/QuillModules';
import formats from '../../common/exports/QuillFormats';

const ShowEditDetails = ({
  onSubmit,
  title,
  onChange,
  errors,
  intro,
  onChangeQuill,
  createdAt,
  isAuthenticated,
  editBlog,
  author
}) => {
  return (
    <div className="row mt-5">
      {editBlog ? (
        <div className="col-12 text-center">
          {isAuthenticated && (
            <form className="w-100" onSubmit={onSubmit}>
              <div className="form-group">
                <TextInput
                  value={title}
                  onChange={onChange}
                  name="title"
                  extraClass="text-center"
                  placeholder="Blog Title"
                  error={errors.blogName}
                />
                <small className="text-muted">Blog title</small>
              </div>
              <div className="form-group">
                <ReactQuill
                  value={intro || ''}
                  onChange={onChangeQuill}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                />
                <small className="text-muted">Blog introduction</small>
              </div>
              <div className="form-group">
                <p className="text-muted">
                  <i>
                    <span>Posted on </span>
                    <Moment format="D MMM YYYY" withTitle>
                      {createdAt}
                    </Moment>
                  </i>
                </p>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="col-12 text-center">
          <h2 className="mt-3">{title}</h2>
          <p className="text-muted mt-3">by {author}</p>
          <div
            className="lead mx-2 mx-md-5"
            dangerouslySetInnerHTML={{
              __html: intro
            }}
          ></div>
          <p className="text-muted mx-2 mx-md-5 mt-2">
            <i>
              <span>Posted on </span>
              <Moment format="D MMM YYYY" withTitle>
                {createdAt}
              </Moment>
            </i>
          </p>
        </div>
      )}
    </div>
  );
};

ShowEditDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  intro: PropTypes.string,
  onChangeQuill: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  editBlog: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired
};

export default ShowEditDetails;
