/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import GameContainer from './containers/GameContainer';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route path="/" component={GameContainer} />
      </Switch>
    </App>
  </Router>
);
