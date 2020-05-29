import React, { ReactNode } from 'react';

import styles from './GameScreen.scss';

type GameScreenProps = {
  children: ReactNode;
};

const GameScreen: React.FC<GameScreenProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.game}>{children}</div>
    </div>
  );
};

export default GameScreen;
