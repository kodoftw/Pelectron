// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameScreen.scss';

// Containers
import PadContainer from '../containers/PadContainer';
import BulletContainer from '../containers/BulletContainer';

// Components
import Score from './Score';

export default class GameScreen extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.gameContainer} data-tid="gameContainer">
          <BulletContainer />
          <Score score={score} />
          <PadContainer />
        </div>
      </div>
    );
  }
}
