import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const optionsCategory = [
      { label: 'Others', value: 'Others' },
      { label: 'Business', value: 'Business' },
      { label: 'Wealth', value: 'Wealth' },
      { label: 'Health', value: 'Health' }
    ];
    const selectOptions = optionsCategory.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));
    return (
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <span className="align-middle">Personal Blog</span>
            </div>
            <div className="col-6 text-right">
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

Footer.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(Footer);
