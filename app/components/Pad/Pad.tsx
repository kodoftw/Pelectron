import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import PadEntity from '../../entities/Pad.entity';
import { PadPosition } from '../../models/Pad';

import styles from './Pad.scss';

export type PadProps = {
  pad: PadEntity | undefined;
  position: PadPosition | undefined;
};

const Pad: React.FC<PadProps> = ({ pad, position }) => {
  const [positionClass, setPositionClass] = useState('');

  function getPositionClass(pos: PadPosition): string {
    if (pos === PadPosition.Left) return styles.left;
    if (pos === PadPosition.Right) return styles.right;
    return styles.center;
  }

  useEffect(() => {
    if (position != null) {
      setPositionClass(getPositionClass(position));
    }
  }, [position]);

  if (!pad) {
    return <div />;
  }

  return <div className={classNames(styles.pad, positionClass)} />;
};

export default Pad;
