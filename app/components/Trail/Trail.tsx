import React from 'react';

import TrailEntity from '../../entities/Trail.entity';

import styles from './Trail.scss';

export type TrailProps = {
  trail: TrailEntity | undefined;
};

const Trail: React.FC<TrailProps> = ({ trail }) => {
  if (!trail) {
    return <div />;
  }

  const style = {
    backgroundColor: trail.Data.Color,
    top: `${trail.Data.Position.Top}%`,
    left: `${trail.Data.Position.Left}%`,
    width: `${trail.Data.Size}vh`,
    height: `${trail.Data.Size}vh`,
  };

  return <div className={styles.trail} style={style} />;
};

export default Trail;
