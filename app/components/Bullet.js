// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Bullet.scss';

import classNames from 'classnames';

export default class Bullet extends Component {
  render() {
    const { bullet } = this.props;

    return (
      <div
        className={classNames(styles.bullet)}
        style={{backgroundColor: bullet.color}}
        data-tid="bullet">
      </div>
    );
  }
}
