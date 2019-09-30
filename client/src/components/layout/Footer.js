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
      <footer className="bg-info text-white mt-5 pt-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <div className="row">
                <div className="col-12 mb-1">
                  <h4>
                    Kamran Elchuzade <span className="h6">Personal Blog</span>
                  </h4>
                </div>
                <div className="col-12 mb-2">
                  <Link to="/" className="mr-2 text-white">
                    Blog
                  </Link>
                  <Link to="/contacts" className="mx-2 text-white">
                    Contacts
                  </Link>
                </div>
                <div className="col-12">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} Kamran Elchuzade
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5 mb-5 order-first order-md-2">
              <form
                className="text-center"
                method="POST"
                action="https://formspree.io/webinartrack@gmail.com"
              >
                <div className="form-row">
                  <div className="col-5">
                    <input
                      name="email"
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="email"
                    />
                  </div>
                  <div className="col-4">
                    <select
                      name="category"
                      className="form-control form-control-sm"
                    >
                      {selectOptions}
                    </select>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light btn-sm px-2" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
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
