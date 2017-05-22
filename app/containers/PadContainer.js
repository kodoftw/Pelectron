// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pad from '../components/Pad';
import * as PadActions from '../actions/pad';

function mapStateToProps(state) {
  return {
      position: state.padPosition
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PadActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pad);