import React from 'react';

import styles from './Score.scss';

type ScoreProps = {
  score: number;
};

const Score: React.FC<ScoreProps> = ({ score }) => {
  return <div className={styles.score}>Score: {score}</div>;
};

export default Score;
