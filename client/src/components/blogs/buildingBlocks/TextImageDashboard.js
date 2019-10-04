import React from 'react';
import PropTypes from 'prop-types';

const TextImageDashboard = ({ isAuthenticated, openModal }) => {
  return (
    <div className="row my-3">
      <div className="col-12">
        <h3 className="text-center">
          {isAuthenticated && (
            <button className="btn btn-info mr-3" onClick={openModal}>
              <i className="fas fa-plus" />
            </button>
          )}
          Text Element
        </h3>
      </div>
    </div>
  );
};

TextImageDashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired
};

export default TextImageDashboard;
