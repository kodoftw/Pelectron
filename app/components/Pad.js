// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Pad.scss';

import classNames from 'classnames';

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
      case 1:
        return styles.center;

      case 2:
        return styles.right;

      default:
        return styles.left;
    }
  }
}
