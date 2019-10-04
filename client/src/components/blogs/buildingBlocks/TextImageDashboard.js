import React from 'react';
import PropTypes from 'prop-types';
import FileInputGroup from '../../common/FileInputGroup';

const TextImageDashboard = ({
  isAuthenticated,
  openModal,
  onSubmitNewImage,
  onChangeImage,
  imageObject,
  errors,
  onDeleteNewImage
}) => {
  return (
    <div className="row my-3">
      <div className="col-6">
        <h3 className="text-center">
          {isAuthenticated && (
            <button className="btn btn-info mr-3" onClick={openModal}>
              <i className="fas fa-plus" />
            </button>
          )}
          Text Element
        </h3>
      </div>
      <div className="col-6">
        <h3 className="text-center">
          {isAuthenticated && (
            <form onSubmit={onSubmitNewImage}>
              <FileInputGroup
                name="blogAvatar"
                placeholder="Avatar"
                onChange={onChangeImage}
                sendFile={imageObject}
                error={errors.image}
                accept="image/png, image/jpg, image/jpeg"
              />
              <div className="row mt-2 mb-5">
                <div className="col">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={onDeleteNewImage}
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
          Image Element
        </h3>
      </div>
    </div>
  );
};

TextImageDashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  onSubmitNewImage: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  imageObject: PropTypes.object.isRequired,
  onDeleteNewImage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TextImageDashboard;
