import React from 'react';

import styles from './Bullet.scss';

import BulletEntity from '../../entities/Bullet.entity';

export type BulletProps = {
  bullet: BulletEntity | undefined;
};

const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  if (!bullet) {
    return <div />;
  }

  const bulletStyle = {
    backgroundColor: bullet.Data.Color,
    top: `${bullet.Data.Position.Top}%`,
    left: `${bullet.Data.Position.Left}%`,
  };

  return <div className={styles.bullet} style={bulletStyle} />;
};

export default Bullet;
