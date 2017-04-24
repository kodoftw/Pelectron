// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import score from './score';

const rootReducer = combineReducers({
  score,
  router
});

export default rootReducer;
