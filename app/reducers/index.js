// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import bullet from './bullet';
import score from './score';
import pad from './pad';

const rootReducer = combineReducers({
  bullet,
  score,
  pad,
  router
});

export default rootReducer;
