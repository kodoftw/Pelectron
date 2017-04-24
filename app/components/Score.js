// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Score.scss';

export default class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className={styles.score} data-tid="score">
        Score: { score }
      </div>
    );
  }
}
