import React from 'react';
import PropTypes from 'prop-types';
import FileInputGroup from '../../common/FileInputGroup';

const ShowEditAvatar = ({
  avatar,
  isAuthenticated,
  editBlog,
  onSubmitAvatar,
  onChangeAvatar,
  avatarObject,
  errors,
  onDeleteAvatar
}) => {
  return (
    <div className="col-12 text-center">
      <img
        src={
          avatar ? avatar.location : 'https://picsum.photos/1200/300'
        }
        alt="avatar"
        className="img-fluid"
      />
      {isAuthenticated && editBlog && (
        <form onSubmit={onSubmitAvatar}>
          <FileInputGroup
            name="blogAvatar"
            placeholder="Avatar"
            onChange={onChangeAvatar}
            sendFile={avatarObject}
            error={errors.avatar}
            accept="image/png, image/jpg, image/jpeg"
          />
          <small className="text-muted">
            This image will be shown in all blogs page and landing page
          </small>
          <div className="row mt-2 mb-5">
            <div className="col">
              <button
                className="btn btn-danger mx-2"
                onClick={onDeleteAvatar}
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
  );
};

ShowEditAvatar.propTypes = {
  avatar: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  editBlog: PropTypes.bool.isRequired,
  onSubmitAvatar: PropTypes.func.isRequired,
  onChangeAvatar: PropTypes.func.isRequired,
  avatarObject: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onDeleteAvatar: PropTypes.func.isRequired
};

export default ShowEditAvatar;
