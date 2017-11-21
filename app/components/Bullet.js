// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Bullet.scss';

import { Bullet as BulletSpawn } from '../entities/index.js';

import classNames from 'classnames';

export default class Bullet extends Component {
  render() {
    const { bullet } = this.props;

    return (
      <div
        className={classNames(styles.bullet)}
        style={this.getBulletStyle(bullet)}
        data-tid="bullet">
      </div>
    );
  }

  getBulletStyle(bullet: BulletSpawn) {
    return {
      backgroundColor: bullet.State.color,
      top: bullet.State.position.y + '%',
      left: bullet.State.position.x + '%'
    }
  }
}
