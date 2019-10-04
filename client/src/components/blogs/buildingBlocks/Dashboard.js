import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ editBlog, toggleEdit, onSubmit }) => {
  return (
    <div>
      {editBlog ? (
        <React.Fragment>
          <button
            className="btn btn-info m-2 py-3 text-white"
            style={{ minWidth: '48px' }}
            onClick={toggleEdit}
          >
            <i className="fas fa-eye" />
          </button>
          <br />
          <button
            className="btn btn-success m-2 py-3 text-white"
            style={{ minWidth: '48px' }}
            onClick={onSubmit}
          >
            <i className="fas fa-save" />
          </button>
        </React.Fragment>
      ) : (
        <button
          className="btn btn-warning m-2 py-3 text-white"
          style={{ minWidth: '48px' }}
          onClick={toggleEdit}
        >
          <i className="fas fa-pen" />
        </button>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  editBlog: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Dashboard;
