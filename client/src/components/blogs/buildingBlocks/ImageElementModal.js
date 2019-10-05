import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FileInputGroup from '../../common/FileInputGroup';

const ImageElementModal = ({ modal, toggleModal, resetModal, submitModal, onChangeImage, imageObject, errors }) => {
  return (
    <Modal isOpen={modal} toggle={toggleModal} size="lg" onClosed={resetModal}>
      <form onSubmit={submitModal}>
        <ModalHeader className="text-info">Upload New Image</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FileInputGroup
                  name="blogAvatar"
                  placeholder="Avatar"
                  onChange={onChangeImage}
                  sendFile={imageObject}
                  error={errors.image}
                  accept="image/png, image/jpg, image/jpeg"
                />
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
            onClick={toggleModal}
          >
            Cancel
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

ImageElementModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  imageObject: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default ImageElementModal;
