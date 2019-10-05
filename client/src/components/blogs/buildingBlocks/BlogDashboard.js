import React from 'react';
import PropTypes from 'prop-types';

const BlogDashboard = ({
  editBlog,
  toggleEdit,
  onSubmit,
  openTextModal,
  openImageModal
}) => {
  return (
    <div className="dashboard">
      {editBlog ? (
        <div>
          <button
            className="btn btn-secondary m-2 py-3 text-white dashboardBtn"
            onClick={toggleEdit}
          >
            <i className="fas fa-eye" />
          </button>
          <br />
          <button
            className="btn btn-success m-2 py-3 text-white dashboardBtn"
            onClick={onSubmit}
          >
            <i className="fas fa-save" />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-warning m-2 py-3 text-white dashboardBtn"
            onClick={toggleEdit}
          >
            <i className="fas fa-pen" />
          </button>
          <br />
          <button
            className="btn btn-info m-2 py-3 text-white dashboardBtn"
            onClick={openTextModal}
          >
            <i className="fas fa-font" />
          </button>
          <br />
          <button
            className="btn btn-info m-2 py-3 text-white dashboardBtn"
            onClick={openImageModal}
          >
            <i class="fas fa-image" />
          </button>
        </div>
      )}
    </div>
  );
};

BlogDashboard.propTypes = {
  editBlog: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  openTextModal: PropTypes.func.isRequired,
  openImageModal: PropTypes.func.isRequired
};

export default BlogDashboard;
