import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Switch from 'react-switch';
import classnames from 'classnames';
import { changeTheme } from '../../actions/commonActions';
import Helmet from 'react-helmet';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: false
    };
  }

  componentDidMount() {
    this.props.changeTheme(false);
  }

  handleChange = checked => {
    this.setState({ dark: checked });
    if (checked) {
      localStorage.setItem('dark', true);
      this.props.changeTheme(true);
    } else {
      localStorage.setItem('dark', false);
      this.props.changeTheme(false);
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
      <nav
        className={classnames('navbar navbar-expand-lg fixed-top', {
          'navbar-dark bg-dark': this.state.dark,
          'navbar-light bg-light': !this.state.dark
        })}
      >
        {this.state.dark && (
          <Helmet>
            <style>
              {
                'h1,h2,h3,h4,h5,h6,p, .modal-content, .card-body { color: #FFFFFF; border: none }'
              }
            </style>
            <style>
              {
                '.card, .modal-header, .modal-footer { background: #323639; border: none; }'
              }
            </style>
            <style>{'.card-footer { background: #282C2F }'}</style>
            <style>{'body, .modal-body { background: #202124 }'}</style>
          </Helmet>
        )}
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
                  checked={this.state.dark}
                  width={64}
                  height={28}
                  onColor={'#C0b283'}
                  offColor={'#323639'}
                  checkedIcon={
                    <svg
                      width="26"
                      height="26"
                      viewBox="2 0 34 34"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>icon-dark-mode</title>
                      <path
                        d="M29.84 21.55a.718.718 0 0 0-.798-.221 7.58 7.58 0 0 1-2.566.43c-4.345 0-7.88-3.535-7.88-7.88a7.855 7.855 0 0 1 3.453-6.512.717.717 0 0 0-.3-1.303A6.948 6.948 0 0 0 20.746 6C14.82 6 10 10.82 10 16.745c0 5.926 4.82 10.746 10.745 10.746 3.761 0 7.182-1.912 9.15-5.112a.72.72 0 0 0-.055-.828z"
                        fill="#000"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  }
                  uncheckedIcon={
                    <svg
                      width="30"
                      height="30"
                      viewBox="-1 0 40 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>icon-light-mode</title>
                      <path
                        d="M26.998 10.99A6.017 6.017 0 0 1 33.011 17a6.017 6.017 0 0 1-6.013 6.01A6.016 6.016 0 0 1 20.99 17 6.016 6.016 0 0 1 27 10.989zm0-1.768a1.173 1.173 0 0 1-1.172-1.173V6.173a1.173 1.173 0 0 1 2.345 0V8.05c0 .648-.524 1.173-1.173 1.173zm0 15.556c.65 0 1.173.525 1.173 1.173v1.876a1.173 1.173 0 0 1-2.345 0V25.95c0-.648.527-1.173 1.172-1.173zM32.5 11.5a1.17 1.17 0 0 1 0-1.658l1.326-1.329a1.174 1.174 0 0 1 1.658 1.66l-1.326 1.327a1.174 1.174 0 0 1-1.658 0zm-11 11a1.174 1.174 0 0 1 0 1.658l-1.326 1.326a1.174 1.174 0 0 1-1.66-1.658l1.328-1.326a1.17 1.17 0 0 1 1.658 0zm13.278-5.501c0-.646.524-1.173 1.173-1.173h1.876a1.173 1.173 0 0 1 0 2.346H35.95a1.172 1.172 0 0 1-1.173-1.173zm-15.556 0c0 .648-.525 1.172-1.173 1.172h-1.876a1.172 1.172 0 1 1 0-2.345h1.876c.648 0 1.173.527 1.173 1.173zM32.5 22.5a1.174 1.174 0 0 1 1.658 0l1.326 1.326a1.17 1.17 0 0 1 0 1.658 1.17 1.17 0 0 1-1.658 0L32.5 24.158a1.17 1.17 0 0 1 0-1.658zm-11-11a1.17 1.17 0 0 1-1.658 0l-1.329-1.326a1.174 1.174 0 0 1 1.66-1.658l1.327 1.326a1.174 1.174 0 0 1 0 1.658z"
                        fill="#FFF"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  }
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
  auth: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, changeTheme }
)(withRouter(Navbar));
