import React from 'react';
import PropTypes from 'prop-types';

const TextImageDashboard = ({ openTextModal, openImageModal }) => {
  return (
    <div className="row my-3">
      <div className="col-6">
        <h3 className="text-center">
          <button className="btn btn-info btn-lg mr-3" onClick={openTextModal}>
            <i className="fas fa-font" />
          </button>
        </h3>
      </div>
      <div className="col-6">
        <h3 className="text-center">
          <button className="btn btn-info btn-lg mr-3" onClick={openImageModal}>
            <i class="fas fa-image" />
          </button>
        </h3>
      </div>
    </div>
  );
};

TextImageDashboard.propTypes = {
  openModal: PropTypes.func.isRequired,
  openImageModal: PropTypes.func.isRequired
};

export default TextImageDashboard;
