import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme) {
      this.setState({ dark: nextProps.theme.dark });
    }
  }

  render() {
    return (
      <footer
        className={classnames('mt-5 py-4', {
          'bg-dark text-white': this.state.dark,
          'bg-light text-black': !this.state.dark
        })}
      >
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span className="align-middle">Personal Blog</span>
            </div>
            <div className="col-8 text-right">
              <Link to="/" className="mx-2 align-middle">
                Blog
              </Link>
              <Link to="/contacts" className="mx-2 align-middle">
                Contacts
              </Link>
              <span className="mx-2 align-middle">
                <a target="__blank" href="https://github.com/elchuzade">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </span>
              <span className="mx-2">
                <a target="__blank" href="https://linkedin.com/in/elchuzade">
                  <i className="fab fa-linkedin fa-2x align-middle"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <span>
                Copyright © {new Date().getFullYear()} Kamran Elchuzade. All
                rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Footer));
