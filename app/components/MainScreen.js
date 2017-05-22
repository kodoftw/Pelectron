// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainScreen.scss';

// Containers
import PadContainer from '../containers/PadContainer';

// Components
import Score from './Score';

export default class MainScreen extends Component {
  render() {
    const { SetScore, score } = this.props;
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.gameContainer} data-tid="gameContainer">
          <Score score={score} />
          <PadContainer />
        </div>
      </div>
    );
  }
}
