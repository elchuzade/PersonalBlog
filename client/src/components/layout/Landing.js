import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>bla</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Landing));
