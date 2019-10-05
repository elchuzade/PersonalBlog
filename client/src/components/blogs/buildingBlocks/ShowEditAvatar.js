import React from 'react';
import PropTypes from 'prop-types';
import FileInputGroup from '../../common/FileInputGroup';
import TextInput from '../../common/TextInput';
import classnames from 'classnames';

const ShowEditAvatar = ({
  avatar,
  isAuthenticated,
  editBlog,
  onSubmitAvatar,
  onChangeAvatar,
  avatarObject,
  errors,
  onDeleteAvatar,
  copyright,
  onChange
}) => {
  return (
    <div className="row mt-5">
      <div className="col-12 text-center">
        <img
          src={avatar ? avatar.location : 'https://picsum.photos/1200/300'}
          alt="avatar"
          className="img-fluid"
        />
        <br />
        <div
          className={classnames('copyrightLink', {
            'd-none': editBlog
          })}
        >
          <a target="__blank" href={copyright}>
            Copyright
          </a>
        </div>
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
            <TextInput
              value={copyright}
              onChange={onChange}
              name="avatarCopyright"
              extraClass="text-center"
              placeholder="Avatar Copyright"
            />
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
  onDeleteAvatar: PropTypes.func.isRequired,
  copyright: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ShowEditAvatar;
