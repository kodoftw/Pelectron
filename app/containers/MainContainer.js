// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainScreen from '../components/MainScreen';
import * as MainScreenActions from '../actions/mainScreen';

// Libs
import { InputHandler } from '../libs/InputHandler';

function mapStateToProps(state) {
  return {
    score: state.score.score
  };
}

function mapDispatchToProps(dispatch) {
  if (InputHandler) {
    InputHandler.loadActions(dispatch);
  } else {
    throw Error('INPUT HANDLER COULD NOT BE LOADED');
  }

  return bindActionCreators(MainScreenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);