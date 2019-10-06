import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import modules from '../../common/exports/QuillModules';
import formats from '../../common/exports/QuillFormats';

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
    <Modal isOpen={modal} toggle={toggleModal} size="lg" onClosed={resetModal}>
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
                    theme="snow"
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary mainButton" type="submit">
            Submit
          </button>
          <button className="btn btn-dark" type="button" onClick={toggleModal}>
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
  text: PropTypes.string,
  onChangeTextElementQuill: PropTypes.func.isRequired
};

export default TextElementModal;
