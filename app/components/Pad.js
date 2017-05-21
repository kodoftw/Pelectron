// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Pad.scss';

export default class Pad extends Component {
  render() {
    const { } = this.props;
    return (
      <div className={styles.pad} data-tid="pad">
      </div>
    );
  }
}
