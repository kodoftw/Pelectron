// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameScreen from '../components/GameScreen';
import * as GameScreenActions from '../actions/gameScreen';

// Services
import { InputHandler, GameStateController } from '../services/index';

function mapStateToProps(state) {
  return {
    score: state.score.score
  };
}

function mapDispatchToProps(dispatch) {
  if (InputHandler) {
    InputHandler.LoadActions(dispatch);
  } else {
    throw Error('INPUT HANDLER COULD NOT BE LOADED');
  }

  if (GameStateController) {
    GameStateController.StartGame(dispatch);
  } else {
    throw Error('GAME STATE COULD NOT BE INITIALIZED');
  }

  return bindActionCreators(GameScreenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);