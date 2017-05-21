// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainScreen.scss';

// Containers
import Score from './Score';
import Pad from './Pad';

export default class MainScreen extends Component {
  render() {
    const { setScore, score } = this.props;
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.gameContainer} data-tid="gameContainer">
          <Score score={score} />
          <Pad />
        </div>
      </div>
    );
  }
}
