import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactQuill from 'react-quill';

const TextElementModal = ({
  modal,
  toggleModal,
  resetModal,
  submitModal,
  editBlog,
  text,
  onChangeTextElementQuill
}) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      size="lg"
      onClosed={resetModal}
    >
      <form onSubmit={submitModal}>
        <ModalHeader className="text-info">
          {editBlog ? <span>Edit</span> : <span>Add</span>} Element
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <ReactQuill
                    value={text || ''}
                    onChange={onChangeTextElementQuill}
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
            onClick={toggleModal}
          >
            Cancel
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

TextElementModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  editBlog: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onChangeTextElementQuill: PropTypes.func.isRequired
};

export default TextElementModal;
