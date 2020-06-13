import React from 'react';

import BulletEntity from '../../entities/Bullet.entity';

import styles from './Bullet.scss';

export type BulletProps = {
  bullet: BulletEntity | undefined;
};

const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  if (!bullet) {
    return <div />;
  }

  const bulletStyle = {
    backgroundColor: bullet.Data.Color,
    top: `${bullet.Position.Top}%`,
    left: `${bullet.Position.Left}%`,
  };

  return <div className={styles.bullet} style={bulletStyle} />;
};

export default Bullet;
