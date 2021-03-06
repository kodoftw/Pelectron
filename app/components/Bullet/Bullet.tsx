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

  const style = {
    backgroundColor: bullet.Data.Color,
    top: `${bullet.Position.Top}%`,
    left: `${bullet.Position.Left}%`,
    width: `${bullet.Data.Size}vh`,
    height: `${bullet.Data.Size}vh`,
  };

  return <div className={styles.bullet} style={style} />;
};

export default Bullet;
