// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pad from '../components/Pad';

function mapStateToProps(state) {
  return {
      position: state.pad.position
  };
}

export default connect(mapStateToProps, null)(Pad);