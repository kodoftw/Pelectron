// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import score from './score';
import pad from './pad';

const rootReducer = combineReducers({
  score,
  pad,
  router
});

export default rootReducer;
