// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Pad.scss';

import classNames from 'classnames';

import { PadPosition } from '../models/index';

export default class Pad extends Component {
  render() {
    const { position } = this.props;
    let positionClass = this.getPositionClass(position);

    return (
      <div className={classNames(styles.pad, positionClass)} data-tid="pad">
      </div>
    );
  }

  getPositionClass(position) {
    switch (position) {
      case PadPosition.LEFT:
        return styles.left;

      case PadPosition.RIGHT:
        return styles.right;

      default:
        return styles.center;
    }
  }
}
