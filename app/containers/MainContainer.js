// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainScreen from '../components/MainScreen';
import * as MainScreenActions from '../actions/mainScreen';

// Libs
import InputHandler from '../libs/InputHandler';

function mapStateToProps(state) {
  return {
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MainScreenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);