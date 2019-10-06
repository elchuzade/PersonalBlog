import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Switch from 'react-switch';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleChange = checked => {
    this.setState({ checked });
    if (checked) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Elchuzade
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blog
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link className="nav-link" to="/contacts">
                  About
                </Link>
              </li>
              {isAuthenticated && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/status">
                      Status
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </Link>
                  </li>
                </React.Fragment>
              )}
              <li className="nav-item navbarSwitch">
                <Switch
                  onChange={this.handleChange}
                  checked={this.state.checked}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
