import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../../common/TextInput';

const NewBlogModal = ({
  modal,
  toggleModal,
  resetModal,
  submitModal,
  title,
  onChange,
  errors,
  author,
  editBlog
}) => {
  return (
    <Modal isOpen={modal} toggle={toggleModal} size="lg" onClosed={resetModal}>
      <form onSubmit={submitModal}>
        <ModalHeader className="text-info">
          {editBlog ? <span>Edit</span> : <span>Add</span>} Blog
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="title"
                    label="title"
                    error={errors.title}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="author"
                    value={author}
                    onChange={onChange}
                    placeholder="author"
                    label="author"
                    error={errors.author}
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
          <button
            className="btn btn-secondary"
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

NewBlogModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired,
  editBlog: PropTypes.bool.isRequired
};

export default NewBlogModal;
